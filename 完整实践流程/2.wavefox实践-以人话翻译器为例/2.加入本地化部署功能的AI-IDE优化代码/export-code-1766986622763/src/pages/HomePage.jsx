import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, FileDigit, Send, Loader2 } from 'lucide-react';
import ReportInputArea from '../components/ReportInputArea';
import InterpretationResult from '../components/InterpretationResult';
import DisclaimerFooter from '../components/DisclaimerFooter';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'image', 'pdf'
  const [inputContent, setInputContent] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleInterpret = async () => {
    if (!inputContent.trim() && activeTab === 'text') {
      alert('请输入报告内容');
      return;
    }
    
    setIsProcessing(true);
    setInterpretation('');
    
    try {
      // 构造AI请求
      const query = `请将以下医学报告内容转换为通俗易懂的生活化比喻解释，使用小学三年级水平的语言：\n\n${inputContent}`;
      
      // 调用AI接口
      const response = await fetch('https://www.weavefox.cn/api/open/v1/ai_app_proxy/rest/v1/chat/62775', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stream': 'yes'
        },
        body: JSON.stringify({ query })
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const chunkArr = chunk.split('\n\n');
          
          for (const chunkItem of chunkArr) {
            if (chunkItem.startsWith('data: ')) {
              const chunkObj = JSON.parse(chunkItem.replace('data: ', '').trim());
              if (chunkObj.success) {
                result += chunkObj.data;
                setInterpretation(result);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('Error interpreting report:', error);
      setInterpretation('解读过程中出现错误，请稍后重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 这里应该处理文件上传和OCR识别
      // 为演示目的，我们使用模拟文本
      setInputContent(`已上传文件: ${file.name}\n\n文件内容识别中...\n\n白细胞计数: 12.5 ↑\n淋巴细胞百分比: 18.3 ↓\n中性粒细胞百分比: 75.2 ↑\n血红蛋白: 132\n血小板计数: 256`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">小白报告解读器</h1>
          <p className="text-gray-600 mt-1">将复杂的医学报告转换为通俗易懂的生活化解释</p>
        </div>
      </header>

      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'text' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('text')}
            >
              <FileText className="mr-2 h-4 w-4" />
              粘贴文本报告
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'image' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('image')}
            >
              <Image className="mr-2 h-4 w-4" />
              上传报告照片
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'pdf' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('pdf')}
            >
              <FileDigit className="mr-2 h-4 w-4" />
              上传PDF报告
            </button>
          </div>

          {/* Input Area */}
          <ReportInputArea
            activeTab={activeTab}
            inputContent={inputContent}
            setInputContent={setInputContent}
            triggerFileInput={triggerFileInput}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
          />

          {/* Submit Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleInterpret}
              disabled={isProcessing}
              className="flex items-center justify-center w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  解读中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  解读一下
                </>
              )}
            </button>
          </div>

          {/* Results Area */}
          <InterpretationResult
            interpretation={interpretation}
            isProcessing={isProcessing}
          />
        </div>
      </main>

      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  );
};

export default HomePage;