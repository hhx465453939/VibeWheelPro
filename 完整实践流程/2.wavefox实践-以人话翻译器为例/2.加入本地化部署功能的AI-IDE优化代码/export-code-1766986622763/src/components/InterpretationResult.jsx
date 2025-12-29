import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const InterpretationResult = ({ interpretation, isProcessing }) => {
  // 模拟结构化解析结果
  const mockResults = [
    {
      id: 1,
      indicator: '白细胞计数',
      explanation: '可以把白细胞想象成身体里的警察，专门负责抓坏人（病毒、细菌等）。正常情况下，每单位体积血液里有4-10个这样的“警察”。',
      clinical: '数值升高通常表示身体正在对抗感染或炎症，但也可能与某些药物或疾病有关。'
    },
    {
      id: 2,
      indicator: '淋巴细胞百分比',
      explanation: '淋巴细胞是白细胞的一种，像是特种部队，专门对付病毒。它们在所有白细胞中应该占20%-40%的比例。',
      clinical: '比例偏低可能表示免疫系统功能下降，需要进一步检查原因。'
    },
    {
      id: 3,
      indicator: '中性粒细胞百分比',
      explanation: '中性粒细胞是白细胞中的主力部队，专门处理细菌感染。它们在所有白细胞中通常占50%-70%。',
      clinical: '比例偏高常见于细菌感染，但也可能与应激反应或其他疾病有关。'
    }
  ];

  // 如果有实际的AI解读结果，则使用实际结果
  const results = interpretation ? [{ id: 0, indicator: 'AI解读结果', explanation: interpretation, clinical: '以上是AI对您报告的通俗解释' }] : mockResults;

  return (
    <div className="px-6 pb-6">
      {isProcessing && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <p className="text-blue-800">正在为您解读报告，请稍候...</p>
        </div>
      )}
      
      {interpretation || isProcessing ? (
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="border border-gray-200 rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">{result.indicator}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{result.explanation}</p>
                <p className="text-sm text-gray-600">临床意义：{result.clinical}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-500">提交报告后，解读结果将显示在这里</p>
        </div>
      )}
    </div>
  );
};

export default InterpretationResult;