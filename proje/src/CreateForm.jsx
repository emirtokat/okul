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

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormDetails(prevState => ({
      ...prevState,
      questions: prevState.questions.map((q, qIndex) => (
        qIndex === questionIndex ? { ...q, options: q.options.map((o, oIndex) => (
          oIndex === optionIndex ? { ...o, text: value } : o
        )) } : q
      ))
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formDetails);
    const generatedLink = 'https://example.com/survey/12345';
    setLink(generatedLink);
  };

  return (
    <div className="create-form-container">
      <form onSubmit={handleSubmit} className="create-form">
        <h2>Create New Survey</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={formDetails.name}
            onChange={e => setFormDetails({ ...formDetails, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={formDetails.email}
            onChange={e => setFormDetails({ ...formDetails, email: e.target.value })}
            required
          />
        </div>

        {formDetails.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Question"
              value={question.text}
              onChange={e => {
                const updatedQuestions = [...formDetails.questions];
                updatedQuestions[qIndex].text = e.target.value;
                setFormDetails({ ...formDetails, questions: updatedQuestions });
              }}
              required
            />
            <select
              className="form-control mb-2"
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
            <button type="button" className="btn btn-danger mb-2" onClick={() => removeQuestion(qIndex)}><i className="fas fa-trash"></i> Remove Question</button>

            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option d-flex align-items-center mb-2">
                <input
                  type={question.type === 'multipleChoice' ? 'radio' : 'checkbox'}
                  name={`question-${qIndex}`}
                  disabled
                />
                <input
                  type="text"
                  className="form-control ml-2"
                  value={option.text}
                  onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)}
                  required
                />
                <button type="button" className="btn btn-danger ml-2" onClick={() => removeOption(qIndex, oIndex)}><i className="fas fa-trash"></i> Remove Option</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mb-2" onClick={() => addOption(qIndex)}><i className="fas fa-plus"></i> Add Option</button>
          </div>
        ))}

        <button type="button" className="btn add-question-btn" onClick={addQuestion}><i className="fas fa-plus"></i> Add Question</button>
        <button type="submit" className="btn submit-form-btn ml-2"><i className="fas fa-check"></i> Submit Form</button>
      </form>
      {link && (
        <div className="link-display mt-4 p-3 border rounded bg-light text-center">
          <p>Share this link with others to fill out the survey:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
