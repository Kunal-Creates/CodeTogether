import React, { useState } from 'react';
import { 
  FolderIcon, 
  FolderOpenIcon, 
  DocumentIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const FileTree = ({ onFileSelect, selectedFile, onNewFile, onNewFolder }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['src', 'components']));
  const [contextMenu, setContextMenu] = useState(null);

  const fileStructure = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Client.jsx', type: 'file', language: 'javascript' },
            { name: 'CompileButton.jsx', type: 'file', language: 'javascript' },
            { name: 'CopyRoomButton.jsx', type: 'file', language: 'javascript' },
            { name: 'FileTree.jsx', type: 'file', language: 'javascript' },
            { name: 'Header.jsx', type: 'file', language: 'javascript' },
            { name: 'InputWindow.jsx', type: 'file', language: 'javascript' },
            { name: 'LanguageDropdown.jsx', type: 'file', language: 'javascript' },
            { name: 'OutputWindow.jsx', type: 'file', language: 'javascript' },
            { name: 'Sidebar.jsx', type: 'file', language: 'javascript' },
            { name: 'EditorTabs.jsx', type: 'file', language: 'javascript' },
          ]
        },
        {
          name: 'pages',
          type: 'folder',
          children: [
            { name: 'CodeEditor.jsx', type: 'file', language: 'javascript' },
          ]
        },
        {
          name: 'data',
          type: 'folder',
          children: [
            { name: 'languageOptions.js', type: 'file', language: 'javascript' },
          ]
        },
        {
          name: 'styles',
          type: 'folder',
          children: [
            { name: 'index.css', type: 'file', language: 'css' },
          ]
        },
        { name: 'App.jsx', type: 'file', language: 'javascript' },
        { name: 'main.jsx', type: 'file', language: 'javascript' },
      ]
    },
    { name: 'index.html', type: 'file', language: 'html' },
    { name: 'package.json', type: 'file', language: 'json' },
    { name: 'tailwind.config.js', type: 'file', language: 'javascript' },
    { name: 'vite.config.js', type: 'file', language: 'javascript' },
    { name: 'README.md', type: 'file', language: 'markdown' },
  ];

  const toggleFolder = (folderName) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const handleRightClick = (e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleNewFile = () => {
    onNewFile?.();
    closeContextMenu();
  };

  const handleNewFolder = () => {
    onNewFolder?.();
    closeContextMenu();
  };

  const getFileIcon = (fileName, language) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) {
      return <div className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center text-xs font-bold text-black">JS</div>;
    }
    if (fileName.endsWith('.css')) {
      return <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">CSS</div>;
    }
    if (fileName.endsWith('.html')) {
      return <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">HTML</div>;
    }
    if (fileName.endsWith('.json')) {
      return <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">JSON</div>;
    }
    if (fileName.endsWith('.md')) {
      return <div className="w-4 h-4 bg-gray-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">MD</div>;
    }
    return <DocumentIcon className="w-4 h-4 text-gray-400" />;
  };

  const renderItem = (item, level = 0, path = '') => {
    const currentPath = path ? `${path}/${item.name}` : item.name;
    const isExpanded = expandedFolders.has(currentPath);
    const isSelected = selectedFile === currentPath;

    if (item.type === 'folder') {
      return (
        <div key={currentPath}>
          <div
            className={`flex items-center py-1.5 px-2 hover:bg-[#2a2a2a] cursor-pointer group transition-colors ${
              isSelected ? 'bg-[#37373d]' : ''
            }`}
            style={{ paddingLeft: `${8 + level * 16}px` }}
            onClick={() => toggleFolder(currentPath)}
            onContextMenu={(e) => handleRightClick(e, item)}
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
            )}
            {isExpanded ? (
              <FolderOpenIcon className="w-4 h-4 text-[#ff6b35] mr-2 flex-shrink-0" />
            ) : (
              <FolderIcon className="w-4 h-4 text-[#ff6b35] mr-2 flex-shrink-0" />
            )}
            <span className="text-sm text-gray-200 select-none truncate">{item.name}</span>
            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-500 ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </div>
          {isExpanded && item.children && (
            <div>
              {item.children.map(child => renderItem(child, level + 1, currentPath))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={currentPath}
        className={`flex items-center py-1.5 px-2 hover:bg-[#2a2a2a] cursor-pointer group transition-colors ${
          isSelected ? 'bg-[#37373d] border-l-2 border-[#ff6b35]' : ''
        }`}
        style={{ paddingLeft: `${24 + level * 16}px` }}
        onClick={() => onFileSelect(currentPath)}
        onContextMenu={(e) => handleRightClick(e, item)}
      >
        <div className="flex-shrink-0 mr-2">
          {getFileIcon(item.name, item.language)}
        </div>
        <span className="text-sm text-gray-200 select-none truncate">{item.name}</span>
      </div>
    );
  };

  return (
    <>
      <div className="h-full bg-[#1a1a1a] border-r border-[#2d2d2d] overflow-y-auto">
        <div className="p-3 border-b border-[#2d2d2d]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Explorer</h3>
            <div className="flex space-x-1">
              <button 
                onClick={handleNewFile}
                className="p-1.5 hover:bg-[#2a2a2a] rounded transition-colors"
                title="New File"
              >
                <PlusIcon className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                className="p-1.5 hover:bg-[#2a2a2a] rounded transition-colors"
                title="More Actions"
              >
                <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="py-1">
          {fileStructure.map(item => renderItem(item))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeContextMenu}
          />
          <div
            className="fixed z-50 bg-[#2d2d2d] border border-[#3e3e3e] rounded-md shadow-xl py-1 min-w-48"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button 
              onClick={handleNewFile}
              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#37373d] transition-colors"
            >
              New File
            </button>
            <button 
              onClick={handleNewFolder}
              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#37373d] transition-colors"
            >
              New Folder
            </button>
            <hr className="border-[#3e3e3e] my-1" />
            <button className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#37373d] transition-colors">
              Rename
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#37373d] transition-colors">
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FileTree;