import React from 'react';
import renderer from 'react-test-renderer';
import FeedbackStats from '../src/components/FeedbackStats';
import FeedbackContext from '../src/context/FeedbackContext';

describe('FeedbackStats component', () => {
  it('displays the number of reviews when there are no feedback', () => {
    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback: [] }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children[0].children.join('')).toContain('0 Reviews');
  });

  it('displays the average rating', () => {
    const feedback = [
      { id: 1, rating: 4 },
      { id: 2, rating: 5 },
      { id: 3, rating: 3 },
      { id: 4, rating: 2 },
    ];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children[1].children.join('')).toContain('Average Rating: 3.5');
  });

  it('displays a whole number for the average when all ratings are whole numbers', () => {
    const feedback = [
      { id: 1, rating: 3 },
      { id: 2, rating: 4 },
      { id: 3, rating: 2 },
    ];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children[1].children.join('')).toContain('Average Rating: 3');
  });

  it('displays the correct number of reviews and average when there is only one feedback', () => {
    const feedback = [{ id: 1, rating: 5 }];

    const component = renderer.create(
      <FeedbackContext.Provider value={{ feedback }}>
        <FeedbackStats />
      </FeedbackContext.Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children[0].children.join('')).toContain('1 Review');
    expect(tree.children[1].children.join('')).toContain('Average Rating: 5');
  });
});
