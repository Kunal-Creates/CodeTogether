import { useRef, useState } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from "y-monaco"
import LanguagesDropdown from '../components/LanguageDropdown'
import CompileButton from '../components/CompileButton'
import InputWindow from '../components/InputWindow'
import OutputWindow from '../components/OutputWindow'
import { languageOptions } from '../data/languageOptions'
import randomColor from 'randomcolor'
import Client from '../components/Client'
import CopyRoomButton from '../components/CopyRoomButton'

const CodeEditor = ({ roomID }) => {

    const editorRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [hideUsers, setHideUsers] = useState(false);
    const [currLang, setCurrLang] = useState(languageOptions[56]);
    const [compilerText, setCompilerText] = useState('');
    const [input, setInput] = useState('');
    const randomUserColor = randomColor();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.getModel().setEOL(0);
        const ydoc = new Y.Doc(); 
        
        // Use a fallback URL if the environment variable is not set
        const signalingUrl = import.meta.env.VITE_BACKEND_URL || 'wss://y-webrtc-signaling-eu.herokuapp.com/';
        const provider = new WebrtcProvider(roomID, ydoc, { signaling: [signalingUrl] })
        const type = ydoc.getText("monaco"); 

        const undoManager = new Y.UndoManager(type)

        var person = prompt("Please enter your name, under 10 characters");

        if (!person || person.trim() === '' || person.trim() === '\u200B') {
            person = Math.floor(Math.random() * 10) + "User";
        } else {
            person = person.trim().slice(0, 10);
        }        

        const awareness = provider.awareness;

        awareness.setLocalStateField("user", {
            name: person,
            color: randomUserColor
        });     

        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), awareness);
        
        awareness.on('update', () => {
            var jsonData = Array.from(awareness.getStates());
            if (jsonData.length > 1) {
                setHideUsers(false);
                setUsers(jsonData.map(item => ({
                    clientId: item[0],
                    name: item[1].user.name,
                    color: item[1].user.color
                })));
            } else {
                setHideUsers(true);
            }

            var jsonData = Array.from(awareness.getStates());

            var clientsArr = jsonData.map(item => ({
                clientId: item[0],
                name: item[1].user.name,
                color: item[1].user.color
            }));

            clientsArr.forEach(client => {
                const selectionClass = `yRemoteSelection-${client.clientId}`;
                const selectionHeadClass = `yRemoteSelectionHead-${client.clientId}`;

                const red = parseInt(client.color.substring(1, 3), 16);
                const green = parseInt(client.color.substring(3, 5), 16);
                const blue = parseInt(client.color.substring(5, 7), 16);

                const selectionStyle = document.createElement('style');
                selectionStyle.innerHTML = `
                    .${selectionClass} {
                        background-color: rgba(${red}, ${green}, ${blue}, 0.70);
                        border-radius: 2px
                    }

                    .${selectionHeadClass} {
                        z-index: 1;
                        position: absolute;
                        border-left: ${client.color} solid 2px;
                        border-top: ${client.color} solid 2px;
                        border-bottom: ${client.color} solid 2px;
                        height: 100%;
                        box-sizing: border-box;
                    }

                    .${selectionHeadClass}::after {
                        position: absolute;
                        content: ' ';
                        border: 3px solid ${client.color};
                        border-radius: 4px;
                        left: -4px;
                        top: -5px;
                    }

                    .${selectionHeadClass}:hover::before {
                        content: '${client.name}';
                        position: absolute;
                        background-color: ${client.color};
                        color: black;
                        padding-right: 3px;
                        padding-left: 3px;
                        margin-top: -2px;
                        font-size: 12px;
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                `;
                document.head.appendChild(selectionStyle);
            });
        });          

        provider.connect();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Granite
                        </h1>
                        <div className="text-sm text-slate-400">
                            Room: <span className="font-mono text-emerald-400">{roomID}</span>
                        </div>
                    </div>
                    
                    {/* Active Users */}
                    {!hideUsers && (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-400">Active users:</span>
                            <div className="flex space-x-2">
                                {users.map((user) => (
                                    <Client key={user.clientId} username={user.name} color={user.color} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Controls Bar */}
                <div className="flex flex-wrap items-center gap-4 bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                    <div className="flex-1 min-w-64">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                        <LanguagesDropdown currValue={currLang} onSelectChange={(event) => setCurrLang(event)}/>
                    </div>
                    <div className="flex gap-3">
                        <CompileButton content={editorRef} langauge={currLang} input={input} setOutput={(output) => {setCompilerText(output)}}/>
                        <CopyRoomButton />
                    </div>
                </div>

                {/* Editor */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-300">
                                main.{currLang.id === 'python3' || currLang.id === 'python2' ? 'py' : 
                                      currLang.id === 'javascript' || currLang.id === 'nodejs' ? 'js' :
                                      currLang.id === 'java' ? 'java' :
                                      currLang.id === 'cpp' ? 'cpp' :
                                      currLang.id === 'c' ? 'c' : 'txt'}
                            </span>
                        </div>
                        <div className="text-xs text-slate-400">
                            {currLang.label}
                        </div>
                    </div>
                    <Editor
                        aria-labelledby="Code Editor"
                        language={(currLang.id === 'rhino' || currLang.id === 'nodejs') ? 'javascript' : ((currLang.id === 'python3' || currLang.id === 'python2') ? 'python' : currLang.id)}
                        height="60vh"
                        theme='vs-dark'
                        onMount={handleEditorDidMount}
                        options={{
                            cursorBlinking: "smooth",
                            fontSize: 14,
                            lineHeight: 1.6,
                            padding: { top: 16, bottom: 16 },
                            scrollBeyondLastLine: false,
                            minimap: { enabled: true, scale: 0.8 },
                            renderLineHighlight: 'gutter',
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Monaco', 'Menlo', monospace",
                            fontLigatures: true,
                            smoothScrolling: true,
                            cursorSmoothCaretAnimation: true,
                            bracketPairColorization: { enabled: true },
                            guides: {
                                bracketPairs: true,
                                indentation: true,
                            },
                        }}
                    />
                </div>

                {/* Input/Output Section */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Input */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden h-full shadow-lg">
                            <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/50">
                                <span className="text-sm font-medium text-slate-300 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Input
                                </span>
                            </div>
                            <div className="p-4">
                                <InputWindow setInput={(input) => {setInput(input)}}/>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden h-full shadow-lg">
                            <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-300 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Output
                                </span>
                                {compilerText && (
                                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                                        {compilerText?.cpuTime && (
                                            <span className="bg-slate-700/50 px-2 py-1 rounded">
                                                CPU: {compilerText.cpuTime}s
                                            </span>
                                        )}
                                        {compilerText?.memory && (
                                            <span className="bg-slate-700/50 px-2 py-1 rounded">
                                                Memory: {compilerText.memory} KB
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <OutputWindow outputDetails={compilerText}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor