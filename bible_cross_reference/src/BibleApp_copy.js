import React, { useState, useEffect } from 'react';
import { Book, MessageSquare, Send } from 'lucide-react';

// Main component
const BibleApp = () => {
  const [bibleData, setBibleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [outputText, setOutputText] = useState('');
  
  // Load Bible data on component mount
  useEffect(() => {
    const loadBibleData = async () => {
      try {
        // Use standard fetch API instead of window.fs.readFile
        const response = await fetch('/en_kjv.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setBibleData(data);
        
        // Set default selected book to Genesis (first book)
        if (data && data.length > 0) {
          setSelectedBook(data[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to load Bible data:", err);
        setError("Failed to load Bible data. Please try again later.");
        setLoading(false);
      }
    };
    
    loadBibleData();
  }, []);

  // Handle book selection
  const handleBookSelect = (abbrev) => {
    if (bibleData) {
      const book = bibleData.find(b => b.abbrev === abbrev);
      setSelectedBook(book);
      setSelectedChapter(1); // Reset to first chapter when book changes
    }
  };
  
  // Handle chapter selection
  const handleChapterSelect = (chapterNum) => {
    setSelectedChapter(chapterNum);
  };
  
  // Handle user input submission
  const handleSubmit = () => {
    // Future Ollama integration will go here
    setOutputText(`You asked: ${userInput}\n\nThis is where the Ollama response will appear.`);
    
    // Keep the input for now - you might want to clear it in a real app
    // setUserInput('');
  };

  // If still loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading Bible Data...</div>
          <div className="animate-pulse bg-blue-500 h-2 w-64 rounded"></div>
        </div>
      </div>
    );
  }
  
  // If there was an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-center text-red-600">
          <div className="text-2xl font-bold mb-4">Error</div>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  // Helper function to get book name based on abbreviation
  const getBookName = (abbrev) => {
    const bookNames = {
      'gn': 'Genesis', 'ex': 'Exodus', 'lv': 'Leviticus', 'nm': 'Numbers', 'dt': 'Deuteronomy',
      'js': 'Joshua', 'jud': 'Judges', 'rt': 'Ruth', '1sm': '1 Samuel', '2sm': '2 Samuel',
      '1kgs': '1 Kings', '2kgs': '2 Kings', '1ch': '1 Chronicles', '2ch': '2 Chronicles',
      'ezr': 'Ezra', 'ne': 'Nehemiah', 'et': 'Esther', 'job': 'Job', 'ps': 'Psalms',
      'prv': 'Proverbs', 'ec': 'Ecclesiastes', 'so': 'Song of Solomon', 'is': 'Isaiah',
      'jr': 'Jeremiah', 'lm': 'Lamentations', 'ez': 'Ezekiel', 'dn': 'Daniel',
      'ho': 'Hosea', 'jl': 'Joel', 'am': 'Amos', 'ob': 'Obadiah', 'jn': 'Jonah',
      'mi': 'Micah', 'na': 'Nahum', 'hk': 'Habakkuk', 'zp': 'Zephaniah', 'hg': 'Haggai',
      'zc': 'Zechariah', 'ml': 'Malachi', 'mt': 'Matthew', 'mk': 'Mark', 'lk': 'Luke',
      'jo': 'John', 'act': 'Acts', 'rm': 'Romans', '1co': '1 Corinthians', '2co': '2 Corinthians',
      'gl': 'Galatians', 'eph': 'Ephesians', 'ph': 'Philippians', 'cl': 'Colossians',
      '1ts': '1 Thessalonians', '2ts': '2 Thessalonians', '1tm': '1 Timothy', '2tm': '2 Timothy',
      'tt': 'Titus', 'phm': 'Philemon', 'hb': 'Hebrews', 'jm': 'James', '1pe': '1 Peter',
      '2pe': '2 Peter', '1jo': '1 John', '2jo': '2 John', '3jo': '3 John', 'jd': 'Jude',
      're': 'Revelation'
    };
    
    return bookNames[abbrev] || abbrev;
  };

  // Main render
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Book Selection Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center">
            <Book className="mr-2 h-5 w-5" />
            Bible Books
          </h2>
        </div>
        <div className="overflow-y-auto h-full">
          {bibleData && bibleData.map(book => (
            <button
              key={book.abbrev}
              onClick={() => handleBookSelect(book.abbrev)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedBook && selectedBook.abbrev === book.abbrev ? 'bg-blue-100 font-medium' : ''
              }`}
            >
              {getBookName(book.abbrev)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar with Chapter Selection */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {selectedBook ? getBookName(selectedBook.abbrev) : 'Select a Book'}
            </h1>
            
            {selectedBook && (
              <div className="flex items-center">
                <span className="mr-2">Chapter:</span>
                <select 
                  value={selectedChapter}
                  onChange={(e) => handleChapterSelect(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {selectedBook.chapters.map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        
        {/* Bible Text and AI Interaction Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Bible Text Display */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {selectedBook && selectedChapter > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {getBookName(selectedBook.abbrev)} {selectedChapter}
                </h2>
                <div className="space-y-2">
                  {selectedBook.chapters[selectedChapter - 1].map((verse, index) => (
                    <p key={index} className="leading-relaxed">
                      <span className="font-bold text-blue-600 mr-2">{index + 1}</span>
                      {verse}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* AI Interaction Panel */}
          <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask about Scripture
              </h2>
            </div>
            
            {/* Output Display */}
            <div className="flex-1 p-4 overflow-y-auto bg-white">
              {outputText ? (
                <div className="whitespace-pre-wrap">{outputText}</div>
              ) : (
                <div className="text-gray-500 italic">
                  Ask a question about the Bible text to see the response here.
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-start">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors h-24 flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleApp;