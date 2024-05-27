import React, { useState } from 'react';
import './styles/createform.css';

const CreateForm = () => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    questions: []
  });

  const [link, setLink] = useState('');

  const addQuestion = () => {
    const newQuestion = { text: '', type: 'multipleChoice', options: [{ text: '' }] };
    setFormDetails(prevState => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion]
    }));
  };

  const removeQuestion = index => {
    setFormDetails(prevState => ({
      ...prevState,
      questions: prevState.questions.filter((_, qIndex) => qIndex !== index)
    }));
  };

  const addOption = questionIndex => {
    setFormDetails(prevState => ({
      ...prevState,
      questions: prevState.questions.map((q, qIndex) => (
        qIndex === questionIndex ? { ...q, options: [...q.options, { text: '' }] } : q
      ))
    }));
  };

  const removeOption = (questionIndex, optionIndex) => {
    setFormDetails(prevState => ({
      ...prevState,
      questions: prevState.questions.map((q, qIndex) => (
        qIndex === questionIndex ? { ...q, options: q.options.filter((_, oIndex) => oIndex !== optionIndex) } : q
      ))
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formDetails);
    // Simulate link creation
    const generatedLink = 'https://example.com/survey/12345';
    setLink(generatedLink);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formDetails.name}
            onChange={e => setFormDetails({ ...formDetails, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formDetails.email}
            onChange={e => setFormDetails({ ...formDetails, email: e.target.value })}
          />
        </div>

        {formDetails.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block">
            <input
              type="text"
              placeholder="Question"
              value={question.text}
              onChange={e => {
                const updatedQuestions = [...formDetails.questions];
                updatedQuestions[qIndex].text = e.target.value;
                setFormDetails({ ...formDetails, questions: updatedQuestions });
              }}
            />
            <select
              value={question.type}
              onChange={e => {
                const updatedQuestions = [...formDetails.questions];
                updatedQuestions[qIndex].type = e.target.value;
                setFormDetails({ ...formDetails, questions: updatedQuestions });
              }}
            >
              <option value="multipleChoice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button type="button" onClick={() => removeQuestion(qIndex)}>Remove Question</button>

            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option">
                <input
                  type={question.type === 'multipleChoice' ? 'radio' : 'checkbox'}
                  name={`question-${qIndex}`}
                />
                <input
                  type="text"
                  value={option.text}
                  className="option-input"
                  onChange={e => {
                    const updatedQuestions = [...formDetails.questions];
                    updatedQuestions[qIndex].options[oIndex].text = e.target.value;
                    setFormDetails({ ...formDetails, questions: updatedQuestions });
                  }}
                />
                <button type="button" onClick={() => removeOption(qIndex, oIndex)}>Remove Option</button>
              </div>
            ))}
            <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Submit Form</button>
      </form>
      {link && (
        <div className="link-display">
          <p>Share this link with others to fill out the survey:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
