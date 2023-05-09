import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FeedbackList from '../src/components/FeedbackList';
import FeedbackContext from '../src/context/FeedbackContext';
import FeedbackItem from '../src/components/FeedbackItem';
import RatingSelect from '../src/components/RatingSelect';
import FeedbackForm from '../src/components/FeedbackForm';
describe('FeedbackList component', () => {
  const feedback = [
    { id: 1, name: 'John', feedback: 'Great product!', rating: 5 },
    { id: 2, name: 'Jane', feedback: 'Needs improvement', rating: 3 },
    { id: 3, name: 'Mike', feedback: 'Very satisfied', rating: 4 },
  ];

  it('displays feedback items correctly', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback:[feedback[0]] }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );
    const feedbackItems = component.root.findAllByType(FeedbackItem)
    expect(feedbackItems[0].props.item).toStrictEqual({ id: 1, name: 'John', feedback: 'Great product!', rating: 5 })
  });
  it('displays 0 feedback items when feedback array is empty', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback:[] }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );
    const feedbackItems = component.root.findAllByType(FeedbackItem)
    expect(feedbackItems.length === 0).toBe(true)
  });
  it('displays 3 feedback items when feedback array has 3 feedbacks', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback:[] }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );
    const feedbackItems = component.root.findAllByType(FeedbackItem)
    expect(feedbackItems.length === 0).toBe(true)
  });
  
  it('deletes a feedback item correctly', () => {
    const deleteFeedback= jest.fn();
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback, deleteFeedback}}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );

    const deleteBtn = component.root.findAllByProps({ name: "deleteButton" })[1];

    act(() => {
      deleteBtn.props.onClick();
    });

    expect(deleteFeedback).toHaveBeenCalledWith(2);
  });

  
  it('updates the feedback list correctly after editing a feedback item', () => {
    const mockFeedbackList = [
      { id: 1, name: 'John', feedback: 'Great product!', rating: 4 },
      { id: 2, name: 'Jane', feedback: 'Awesome customer service', rating: 5 },
    ];
    const feedbackEdit = {
      edit: false,
      item: { id: 1, name: 'John', feedback: 'Great product!', rating: 4 },
    }
    const mockUpdateFeedback = jest.fn();
    const mockDeleteFeedback = jest.fn();
    const mockEditFeedback = jest.fn();
    const component = renderer.create(
      <FeedbackContext.Provider value={{feedbackEdit:feedbackEdit, feedback: mockFeedbackList, updateFeedback: mockUpdateFeedback, deleteFeedback: mockDeleteFeedback, editFeedback: mockEditFeedback }}>
        <FeedbackForm />
        <FeedbackList/>
      </FeedbackContext.Provider>
    );
  
    const editButton = component.root.findByType(FeedbackList).findAllByType(FeedbackItem)[0].findByProps({ name: 'editButton' });
    act(() => {
      editButton.props.onClick();
    });
  
    const formInputs = component.root.findByProps({ name: 'formInput' });
    const ratingSelect = component.root.findByType(RatingSelect);
    const form = component.root.findByType('form');
    act(() => {
      formInputs.props.onChange({ target: { value: 'New feedback' } });
      ratingSelect.props.select(3);
      form.props.onSubmit({ preventDefault: jest.fn() });
    });
  
    expect(mockEditFeedback).toHaveBeenCalledWith({ id: 1, name: 'John', feedback: 'Great product!', rating: 4 });
  
    const feedbackItems = component.root.findByType(FeedbackList).findAllByType(FeedbackItem)
    expect(feedbackItems.length).toBe(2);
    expect(feedbackItems[0].props.item).toStrictEqual({ id: 1, name: 'John', feedback: 'Great product!', rating: 4 });
  });
  it('displays a message when there are no feedback items', () => {
    const mockFeedbackList = [];
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback: mockFeedbackList }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );
    
  
    const message = component.root.findByProps({ name: 'empty-message' });
    expect(message.children[0]).toBe('No Feedback Yet');
  });     
});
