import React, { useRef, useState, useEffect } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from "y-monaco"
import LanguagesDropdown from '../components/LanguageDropdown'
import CompileButton from '../components/CompileButton'
import { languageOptions } from '../data/languageOptions'
import randomColor from 'randomcolor'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import FileTree from '../components/FileTree'
import EditorTabs from '../components/EditorTabs'
import Terminal from '../components/Terminal'

const CodeEditor = ({ roomID }) => {
    const editorRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [hideUsers, setHideUsers] = useState(false);
    const [currLang, setCurrLang] = useState(languageOptions[56]);
    const [compilerText, setCompilerText] = useState('');
    const [input, setInput] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activePanel, setActivePanel] = useState('explorer');
    const [selectedFile, setSelectedFile] = useState('src/App.jsx');
    const [openTabs, setOpenTabs] = useState([
        { id: 'src/App.jsx', name: 'App.jsx', modified: false }
    ]);
    const [activeTab, setActiveTab] = useState('src/App.jsx');
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const randomUserColor = randomColor();

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                setTerminalOpen(!terminalOpen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [terminalOpen]);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.getModel().setEOL(0);
        const ydoc = new Y.Doc(); 
        
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

    const handleFileSelect = (filePath) => {
        setSelectedFile(filePath);
        
        // Add to tabs if not already open
        if (!openTabs.find(tab => tab.id === filePath)) {
            const fileName = filePath.split('/').pop();
            setOpenTabs(prev => [...prev, { id: filePath, name: fileName, modified: false }]);
        }
        
        setActiveTab(filePath);
    };

    const handleTabClose = (tabId) => {
        setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
        
        if (activeTab === tabId) {
            const remainingTabs = openTabs.filter(tab => tab.id !== tabId);
            if (remainingTabs.length > 0) {
                setActiveTab(remainingTabs[0].id);
                setSelectedFile(remainingTabs[0].id);
            }
        }
    };

    const handleRun = () => {
        setTerminalOpen(true);
        setIsRunning(true);
        
        // Simulate compilation
        setTimeout(() => {
            setIsRunning(false);
        }, 2000);
        
        if (editorRef.current) {
            console.log('Running code...');
        }
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleClearOutput = () => {
        setCompilerText('');
    };

    const handleLivePreview = () => {
        window.open('/preview', '_blank');
    };

    const handleShare = () => {
        console.log('Room URL copied to clipboard!');
    };

    const handleNewFile = () => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            const newFile = { id: fileName, name: fileName, modified: false };
            setOpenTabs(prev => [...prev, newFile]);
            setActiveTab(fileName);
            setSelectedFile(fileName);
        }
    };

    const handleNewFolder = () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            console.log('Creating folder:', folderName);
        }
    };

    return (
        <div className="h-screen bg-[#1a1a1a] text-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <Header 
                users={users}
                roomID={roomID}
                onShare={handleShare}
                onRun={handleRun}
                onLivePreview={handleLivePreview}
            />

            {/* Main content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <Sidebar 
                    isCollapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    activePanel={activePanel}
                    onPanelChange={setActivePanel}
                />

                {/* Side panel content */}
                {!sidebarCollapsed && activePanel === 'explorer' && (
                    <div className="w-64 bg-[#1a1a1a] flex-shrink-0">
                        <FileTree 
                            onFileSelect={handleFileSelect}
                            selectedFile={selectedFile}
                            onNewFile={handleNewFile}
                            onNewFolder={handleNewFolder}
                        />
                    </div>
                )}

                {/* Editor area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Editor tabs */}
                    <EditorTabs 
                        tabs={openTabs}
                        activeTab={activeTab}
                        onTabSelect={(tabId) => {
                            setActiveTab(tabId);
                            setSelectedFile(tabId);
                        }}
                        onTabClose={handleTabClose}
                    />

                    {/* Language selector and controls */}
                    <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-4 py-2 flex-shrink-0">
                        <div className="flex items-center space-x-4">
                            <div className="w-48">
                                <LanguagesDropdown 
                                    currValue={currLang} 
                                    onSelectChange={(event) => setCurrLang(event)}
                                />
                            </div>
                            <CompileButton 
                                content={editorRef} 
                                langauge={currLang} 
                                input={input} 
                                setOutput={(output) => {
                                    setCompilerText(output);
                                    setTerminalOpen(true);
                                }}
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 min-h-0">
                        <Editor
                            aria-labelledby="Code Editor"
                            language={(currLang.id === 'rhino' || currLang.id === 'nodejs') ? 'javascript' : ((currLang.id === 'python3' || currLang.id === 'python2') ? 'python' : currLang.id)}
                            height="100%"
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
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Terminal */}
            <Terminal
                isOpen={terminalOpen}
                onToggle={() => setTerminalOpen(!terminalOpen)}
                output={compilerText}
                isRunning={isRunning}
                onRun={handleRun}
                onStop={handleStop}
                onClear={handleClearOutput}
            />
        </div>
    )
}

export default CodeEditor