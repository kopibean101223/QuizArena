"use client";

import React, { useState, useRef } from 'react';
import { 
  Check, 
  X, 
  Plus, 
  Image as ImageIcon, 
  Type, 
  ChevronDown, 
  Eye, 
  Save,
  Trash2,
  ArrowLeft
} from 'lucide-react';


type QuestionType = 'Multiple' | 'Code' | 'Identification';
type BlockType = 'question' | 'text' | 'image';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface TestCase {
  id: string;
  input: string;
  output: string;
}

interface Block {
  id: string;
  type: BlockType;
  questionType?: QuestionType; 
  title?: string;
  options?: Option[];
  codePrompt?: string;
  codeTemplate?: string;
  testCases?: TestCase[];
  acceptableAnswers?: string;
  content?: string;
  imageUrl?: string;
}

export default function ContentEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState("Midterm Assessment: Data Structures");

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 'b1',
      type: 'question',
      questionType: 'Multiple',
      title: 'Which of the following is not a linear data structure?',
      options: [
        { id: 'o1', text: 'Array', isCorrect: false },
        { id: 'o2', text: 'Linked List', isCorrect: false },
        { id: 'o3', text: 'Tree', isCorrect: true },
      ],
    },
    {
      id: 'b2',
      type: 'question',
      questionType: 'Code',
      title: 'Implement a Binary Search Algorithm',
      codePrompt: 'Write a function `binary_search(arr, target)` that returns the index of `target` in a sorted array `arr`. If not found, return -1.',
      codeTemplate: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        # Your implementation here\n        pass\n        \n    return -1',
      testCases: [{ id: 'tc1', input: '[1, 2, 3, 4, 5], 3', output: '2' }]
    },
    {
      id: 'b3',
      type: 'question',
      questionType: 'Identification',
      title: '',
      acceptableAnswers: ''
    }
  ]);


  const handleSaveToBank = () => {
    const payload = {
  assessmentTitle: assessmentTitle,
      section: "CS301",
      totalBlocks: blocks.length,
      content: blocks
    };
    
    console.log("sample db simulatoin");
    console.log(JSON.stringify(payload, null, 2));
  };


  const addQuestionBlock = () => {
    setBlocks([...blocks, {
      id: `b${Date.now()}`,
      type: 'question',
      questionType: 'Multiple',
      title: '',
      options: [{ id: `o${Date.now()}`, text: '', isCorrect: false }]
    }]);
  };

  const addTextBlock = () => {
    setBlocks([...blocks, { id: `b${Date.now()}`, type: 'text', content: '' }]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBlocks([...blocks, { id: `b${Date.now()}`, type: 'image', imageUrl }]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlockField = (id: string, field: keyof Block, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };


  const addOption = (blockId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.options) {
        return { ...b, options: [...b.options, { id: `o${Date.now()}`, text: '', isCorrect: false }] };
      }
      return b;
    }));
  };

  const updateOption = (blockId: string, optionId: string, newText: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.options) {
        return { ...b, options: b.options.map(o => o.id === optionId ? { ...o, text: newText } : o) };
      }
      return b;
    }));
  };

  const toggleCorrectOption = (blockId: string, optionId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.options) {
        return { ...b, options: b.options.map(o => ({ ...o, isCorrect: o.id === optionId })) };
      }
      return b;
    }));
  };

  const removeOption = (blockId: string, optionId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.options) {
        return { ...b, options: b.options.filter(o => o.id !== optionId) };
      }
      return b;
    }));
  };


  const addTestCase = (blockId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId) {
        const currentCases = b.testCases || [];
        return { ...b, testCases: [...currentCases, { id: `tc${Date.now()}`, input: '', output: '' }] };
      }
      return b;
    }));
  };

  const updateTestCase = (blockId: string, testCaseId: string, field: 'input' | 'output', value: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.testCases) {
        return {
          ...b,
          testCases: b.testCases.map(tc => tc.id === testCaseId ? { ...tc, [field]: value } : tc)
        };
      }
      return b;
    }));
  };

  const removeTestCase = (blockId: string, testCaseId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.testCases) {
        return { ...b, testCases: b.testCases.filter(tc => tc.id !== testCaseId) };
      }
      return b;
    }));
  };

  let questionCounter = 1;
  if (isPreviewMode) {
    let previewQuestionCounter = 1;
    return (
      <div className="font-global flex justify-center max-w-4xl w-full mx-auto relative pt-10 pb-20 px-8">
        <main className="w-full relative flex flex-col gap-6">
          
          <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-8 border-t-[#5C3FE6]">
            <div>
              <h1 className="fw-bold text-[24px] text-gray-900 mb-2">{assessmentTitle}</h1>
              <p className="fs-sm text-gray-500">Please answer all questions below. Your progress is saved automatically.</p>
            </div>
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors fs-sm fw-semibold"
            >
              <ArrowLeft size={16} />
              Back to Editor
            </button>
          </div>

          {blocks.map((block) => {
            const isQuestion = block.type === 'question';
            const currentNumber = isQuestion ? previewQuestionCounter++ : null;

            return (
              <div key={block.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8">
        
                {block.type === 'question' && (
                  <div>
                    <div className="flex gap-4 items-start mb-6">
                      <span className="text-gray-800 fw-semibold">{currentNumber}.</span>
                      <p className="text-gray-900 fs-base fw-regular">{block.title || <span className="italic text-gray-400">Untitled Question</span>}</p>
                    </div>

                    <div className="pl-6">
                      {block.questionType === 'Multiple' && (
                        <div className="flex flex-col gap-3">
                          {block.options?.map((opt) => (
                            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                              <input type="radio" name={`question-${block.id}`} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                              <span className="fs-sm text-gray-700 group-hover:text-gray-900">{opt.text || <span className="italic text-gray-400">Empty Option</span>}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {block.questionType === 'Code' && (
                        <div>
                           <div className="w-full bg-[#F3F4F6] rounded-lg p-4 mb-4 text-gray-700 fs-sm border border-gray-200 whitespace-pre-wrap">
                            {block.codePrompt || "No prompt provided."}
                          </div>
                          <div className="rounded-lg overflow-hidden border border-gray-300">
                            <div className="bg-[#374151] text-gray-300 px-4 py-2 text-xs">Code Editor (Student View)</div>
                            <textarea 
                              className="w-full bg-[#1F2937] p-4 text-gray-300 fs-sm font-mono whitespace-pre focus:outline-none min-h-[150px] resize-y"
                              defaultValue={block.codeTemplate}
                              spellCheck={false}
                            />
                          </div>
                        </div>
                      )}

                      {block.questionType === 'Identification' && (
                        <div>
                          <input 
                            type="text" 
                            placeholder="Your answer"
                            className="w-full md:w-1/2 border-b border-gray-300 pb-2 fs-sm text-gray-800 focus:outline-none focus:border-indigo-600 transition-colors bg-transparent" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

          
                {block.type === 'text' && (
                  <div className="text-gray-800 fs-base whitespace-pre-wrap">
                    {block.content || <span className="italic text-gray-400">Empty text block</span>}
                  </div>
                )}


                {block.type === 'image' && (
                  <div className="flex flex-col items-center">
                    {block.imageUrl && (
                      <img src={block.imageUrl} alt="Reference" className="max-w-full max-h-[400px] object-contain rounded mb-3" />
                    )}
                    {block.content && <p className="fs-sm text-gray-500">{block.content}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>
    );
  }

  return (
    <div className="font-global flex justify-center max-w-6xl w-full mx-auto relative pt-10 pb-20 px-8">
      
      <main className="w-full max-w-3xl flex-shrink-0 relative">
     
        <div className="flex justify-between items-start mb-6 px-1">
          <div className="w-1/2">
            <input
              type="text"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              className="fw-bold text-[20px] text-gray-900 mb-1 w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#5C3FE6] focus:outline-none transition-colors px-1 -ml-1"
              placeholder="Enter Assessment Title"
            />
            <p className="fs-sm text-gray-500 px-1">Section: CS301 • Draft Saved 2 mins ago</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors fs-sm fw-semibold"
            >
              <Eye size={16} />
              Preview
            </button>
            <button 
              onClick={handleSaveToBank}
              className="flex items-center gap-2 bg-[#5C3FE6] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors fs-sm fw-semibold shadow-sm"
            >
              <Save size={16} />
              Save to Bank
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {blocks.map((block) => {
            const isQuestion = block.type === 'question';
            const currentNumber = isQuestion ? questionCounter++ : null;

            return (
              <div key={block.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative group">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-xl bg-transparent group-hover:bg-[#5C3FE6] transition-colors"></div>
                
                <button 
                  onClick={() => removeBlock(block.id)}
                  className="absolute -right-3 -top-3 bg-white border border-gray-200 text-gray-400 hover:text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={16} />
                </button>

                <div className="p-8">
                  {block.type === 'question' && (
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4 items-start w-full mr-4">
                          <span className="text-gray-400 mt-2 fw-semibold">{currentNumber}.</span>
                          <input 
                            type="text" 
                            value={block.title || ''} 
                            onChange={(e) => updateBlockField(block.id, 'title', e.target.value)}
                            placeholder="Type your question here..."
                            className="text-gray-800 fw-regular w-full bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none py-1 text-base transition-colors"
                          />
                        </div>
                        <div className="shrink-0 relative">
                          <select 
                            value={block.questionType}
                            onChange={(e) => updateBlockField(block.id, 'questionType', e.target.value as QuestionType)}
                            className="appearance-none bg-[#F3F4F6] text-gray-700 rounded-md px-3 py-2 fs-sm pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5C3FE6]"
                          >
                            <option value="Multiple">Multiple Choice</option>
                            <option value="Code">Code</option>
                            <option value="Identification">Identification</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                      </div>

                      <div className="pl-6">
                        {block.questionType === 'Multiple' && (
                          <div className="flex flex-col gap-3">
                            {block.options?.map((opt) => (
                              <div key={opt.id} className="flex items-center gap-4 group/opt">
                                <button 
                                  onClick={() => toggleCorrectOption(block.id, opt.id)} 
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${opt.isCorrect ? 'bg-[#10B981] border-[#10B981]' : 'border-gray-300 hover:border-gray-400'}`}
                                >
                                  {opt.isCorrect && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </button>
                                <div className={`flex-1 flex justify-between items-center border rounded-lg p-1 transition-colors ${opt.isCorrect ? 'bg-[#ECFDF5] border-[#10B981]' : 'bg-[#F9FAFB] border-gray-200 focus-within:border-gray-400'}`}>
                                  <input 
                                    type="text" 
                                    value={opt.text}
                                    onChange={(e) => updateOption(block.id, opt.id, e.target.value)}
                                    placeholder="Option text..."
                                    className="bg-transparent fs-sm text-gray-800 w-full p-2 focus:outline-none"
                                  />
                                  {opt.isCorrect && <span className="text-[#10B981] fw-semibold fs-xs pr-3 whitespace-nowrap">Correct Answer</span>}
                                </div>
                                <button onClick={() => removeOption(block.id, opt.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover/opt:opacity-100 transition-opacity">
                                  <X size={18} />
                                </button>
                              </div>
                            ))}
                            
                            <div className="flex items-center gap-4 mt-1 pr-10">
                              <div className="w-5 h-5 rounded-full border border-gray-300 shrink-0 opacity-50"></div>
                              <button 
                                onClick={() => addOption(block.id)}
                                className="flex-1 border border-gray-200 border-dashed rounded-lg p-3 fs-sm text-gray-400 bg-white hover:bg-gray-50 flex justify-between items-center transition-colors text-left"
                              >
                                Add option...
                              </button>
                            </div>
                          </div>
                        )}

                        {block.questionType === 'Code' && (
                          <div>
                            <textarea 
                                className="w-full bg-[#F3F4F6] rounded-lg p-4 mb-4 text-gray-700 fs-sm border border-gray-200 focus:outline-none focus:border-[#5C3FE6] resize-y min-h-[80px]"
                                value={block.codePrompt || ''}
                                onChange={(e) => updateBlockField(block.id, 'codePrompt', e.target.value)}
                                placeholder="Write your coding prompt here..."
                              />
                            <div className="rounded-lg overflow-hidden border border-gray-300 mb-4">
                              <div className="bg-[#374151] text-gray-300 px-4 py-2 text-xs flex justify-between items-center">
                                Solution Template
                              </div>
                              <textarea 
                                className="w-full bg-[#1F2937] p-4 text-gray-300 fs-sm font-mono whitespace-pre focus:outline-none min-h-[150px] resize-y"
                                value={block.codeTemplate || ''}
                                onChange={(e) => updateBlockField(block.id, 'codeTemplate', e.target.value)}
                                spellCheck={false}
                                placeholder="# Write your starter code here..."
                              />
                            </div>

                            <div className="bg-[#F3F4F6] rounded-lg p-4 border border-gray-200">
                              <p className="fs-xs fw-semibold text-gray-500 mb-3 uppercase tracking-wide">Test Cases (Hidden from students)</p>
                              {block.testCases?.map((tc) => (
                                <div key={tc.id} className="flex items-center gap-3 mb-3 group/tc">
                                  <input 
                                    type="text" 
                                    value={tc.input} 
                                    onChange={(e) => updateTestCase(block.id, tc.id, 'input', e.target.value)}
                                    placeholder="Input (e.g. [1,2,3], 2)" 
                                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 fs-sm font-mono focus:outline-none focus:border-[#5C3FE6]" 
                                  />
                                  <span className="text-gray-400 font-mono">→</span>
                                  <input 
                                    type="text" 
                                    value={tc.output} 
                                    onChange={(e) => updateTestCase(block.id, tc.id, 'output', e.target.value)}
                                    placeholder="Expected Output" 
                                    className="w-1/3 border border-gray-300 rounded px-3 py-1.5 fs-sm font-mono focus:outline-none focus:border-[#5C3FE6]" 
                                  />
                                  <button onClick={() => removeTestCase(block.id, tc.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover/tc:opacity-100 transition-opacity">
                                    <X size={18} />
                                  </button>
                                </div>
                              ))}
                              <button 
                                className="text-[#5C3FE6] fw-semibold fs-sm text-left hover:underline flex items-center gap-1 mt-2" 
                                onClick={() => addTestCase(block.id)}
                              >
                                <Plus size={16} /> Add Test Case
                              </button>
                            </div>
                          </div>
                        )}

                        {block.questionType === 'Identification' && (
                          <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 min-h-[100px]">
                            <p className="fs-xs text-gray-500 mb-2">Acceptable Answers (One per line)</p>
                            <textarea 
                              placeholder="Enter valid answers..." 
                              value={block.acceptableAnswers || ''}
                              onChange={(e) => updateBlockField(block.id, 'acceptableAnswers', e.target.value)}
                              className="w-full bg-transparent resize-y fs-sm text-gray-700 focus:outline-none min-h-[60px] placeholder-gray-400"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

              
                  {block.type === 'text' && (
                    <div className="flex gap-4">
                      <div className="text-gray-300 mt-1"><Type size={20} /></div>
                      <textarea 
                        className="w-full text-gray-800 fw-regular bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none py-1 fs-base resize-none min-h-[60px]"
                        placeholder="Add a title, description, or instructions here..."
                        value={block.content || ''}
                        onChange={(e) => updateBlockField(block.id, 'content', e.target.value)}
                      />
                    </div>
                  )}

              
                  {block.type === 'image' && (
                    <div className="flex gap-4 flex-col items-center justify-center">
                      {block.imageUrl ? (
                        <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center p-2">
                           <img src={block.imageUrl} alt="Reference" className="max-w-full max-h-[400px] object-contain rounded" />
                        </div>
                      ) : (
                        <div className="w-full py-10 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon size={32} className="mb-2 text-gray-300" />
                          <p className="fs-sm">Image failed to load or missing.</p>
                        </div>
                      )}
                      <input 
                        type="text"
                        placeholder="Add an optional caption..."
                        value={block.content || ''}
                        onChange={(e) => updateBlockField(block.id, 'content', e.target.value)}
                        className="w-full fs-sm text-center text-gray-500 focus:outline-none bg-transparent mt-2"
                      />
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside className="ml-8 hidden lg:block w-14 shrink-0 relative">
        <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-sm p-3 flex flex-col gap-5 items-center py-5">
          
          <button 
            onClick={addQuestionBlock} 
            title="Add Question"
            className="text-[#5C3FE6] hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 p-2 rounded-full"
          >
            <Plus size={20} />
          </button>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            title="Add Image Reference" 
            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
          >
            <ImageIcon size={20} />
          </button>
          
          <button 
            onClick={addTextBlock}
            title="Add Text Block" 
            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
          >
            <Type size={20} />
          </button>

        </div>
      </aside>
    </div>
  );
}