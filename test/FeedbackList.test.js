import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FeedbackList from '../src/components/FeedbackList';
import FeedbackContext from '../src/context/FeedbackContext';

describe('FeedbackList component', () => {
  const feedback = [
    { id: 1, name: 'John', feedback: 'Great product!', rating: 5 },
    { id: 2, name: 'Jane', feedback: 'Needs improvement', rating: 3 },
    { id: 3, name: 'Mike', feedback: 'Very satisfied', rating: 4 },
  ];

  it('displays feedback items correctly', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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

  it('edits a feedback item correctly', () => {
    const updateFeedback= jest.fn();
    const editFeedback= jest.fn();
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback, updateFeedback, editFeedback }}>
        <FeedbackList />
      </FeedbackContext.Provider>
    );

    const editBtn = component.root.findAllByProps({ name: 'editButton' })[1];

    act(() => {
      editBtn.props.onClick();
    });

    const editForm = component.root.findByProps({name:'formInput'});
    const editNameInput = editForm.findAllByProps({ name: 'name' })[0];
    const editFeedbackInput = editForm.findAllByProps({ name: 'feedback' })[0];
    const editRatingSelect = editForm.findByProps({ name: 'rating' });

    act(() => {
      editNameInput.props.onChange({ target: { name: 'name', value: 'Updated Name' } });
      editFeedbackInput.props.onChange({ target: { name: 'feedback', value: 'Updated feedback' } });
      editRatingSelect.props.onChange({ select: 4 });
      editForm.props.onSubmit({ preventDefault: () => {} });
    });

    expect(updateFeedback).toHaveBeenCalledWith(2, {
      name: 'Updated Name',
      feedback: 'Updated feedback',
      rating: 4,
    });
  });
});
