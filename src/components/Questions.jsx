import { useEffect, useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import axios from 'axios';



const Questions = () => {
    const [questionData, setQuestionData] = useState(null);
    const questionIDs = [
        'AreaUnderTheCurve_901',
        'BinomialTheorem_901',
        'DifferentialCalculus2_901',
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        async function fetchQuestionData() {
            try {
                const response = await axios.get(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIDs[currentQuestionIndex]}`);
                setQuestionData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuestionData();
    }, [currentQuestionIndex, questionIDs]);

    const isPrevButtonDisabled = currentQuestionIndex === 0;
    const isNextButtonDisabled = currentQuestionIndex === questionIDs.length - 1;

    return (
        <>
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full bg-slate-200 p-10 rounded-xl">
                    <h1 className='text-3xl font-bold'>Questions</h1>
                    <div className='p-10'>
                        <MathJaxContext>
                            {questionData ? (
                                <MathJax>
                                    {questionData.Question}
                                </MathJax>
                            ) : (
                                <div>Loading... ! Please wait...</div>
                            )}
                        </MathJaxContext>
                    </div>
                    <div className="flex justify-center">
                        <button disabled={isPrevButtonDisabled} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} className={`inline-flex text-white ${isPrevButtonDisabled ? 'bg-gray-400' : 'bg-indigo-500'} border-0 py-2 px-6 focus:outline-none rounded text-lg`}>Prev</button>

                        <button disabled={isNextButtonDisabled} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className={`ml-4 inline-flex text-white ${isNextButtonDisabled ? 'bg-gray-400' : 'bg-indigo-500'} border-0 py-2 px-6 focus:outline-none rounded text-lg`}>Next</button>
                    </div>
                    <div className="mt-10">
                        <label className="block text-lg font-bold mb-2">
                            Answer:
                            <textarea
                                className="w-full mt-2 px-3 py-2 border rounded-md"
                                rows="5"
                                placeholder="Type your answer here"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Questions;
