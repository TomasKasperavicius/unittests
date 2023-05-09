import React from 'react';
import renderer from 'react-test-renderer';
import FeedbackStats from '../src/components/FeedbackStats';
import FeedbackContext from '../src/context/FeedbackContext';

describe('FeedbackStats component', () => {
  it('displays 0 as the number of reviews when there are no feedbacks', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback: [] }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const review = component.root.findByProps({name:"Review"})
    expect(review.children.join("")).toContain('0 Reviews');
  });
  it('displays 3 as the number of reviews when there are three feedbacks', () => {
    const feedback = [
      { id: 1,text: "Test feedback1", rating: 4 },
      { id: 2,text: "Test feedback2", rating: 5 },
      { id: 3,text: "Test feedback3", rating: 3 },
    ];
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const review = component.root.findByProps({name:"Review"})
    expect(review.children.join("")).toContain('3 Reviews');
  });
  it('displays correct average rating when it is decimal', () => {
    const feedback = [
      { id: 1,text: "Test feedback1", rating: 4 },
      { id: 2,text: "Test feedback2", rating: 5 },
      { id: 3,text: "Test feedback3", rating: 3 },
      { id: 4,text: "Test feedback4", rating: 2 },
    ];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const rating = component.root.findByProps({name:"Rating"})
    expect(rating.children.join('')).toContain('Average Rating: 3.5');
  });

  it('displays correct average rating when it is a whole number', () => {
    const feedback = [
      { id: 1,text: "Test feedback1", rating: 4 },
      { id: 3,text: "Test feedback2", rating: 3 },
      { id: 4,text: "Test feedback3", rating: 2 },
    ];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const rating = component.root.findByProps({name:"Rating"})

    expect(rating.children.join('')).toContain('Average Rating: 3');
  });

  it('displays the correct number of reviews and average when there is only one feedback', () => {
    const feedback = [{ id: 1,text: "Test feedback1", rating: 5 }];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const review = component.root.findByProps({name:"Review"})
    const rating = component.root.findByProps({name:"Rating"})

    expect(review.children.join('')).toContain('1 Review');
    expect(rating.children.join('')).toContain('Average Rating: 5');
  });
  it('displays the correct number of reviews and average when there are three feedbacks', () => {
    const feedback = [
      { id: 1,text: "Test feedback1", rating: 4 },
      { id: 3,text: "Test feedback2", rating: 3 },
      { id: 4,text: "Test feedback3", rating: 2 },
    ];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );
    const review = component.root.findByProps({name:"Review"})
    const rating = component.root.findByProps({name:"Rating"})
    expect(review.children.join('')).toContain('3 Reviews');
    expect(rating.children.join('')).toContain('Average Rating: 3');
  });
});
