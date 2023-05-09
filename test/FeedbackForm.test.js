/* eslint-disable testing-library/await-async-query */
import React from 'react'
import renderer, { act } from 'react-test-renderer'
import FeedbackForm from '../src/components/FeedbackForm'
import Button from '../src/components/shared/Button'
import FeedbackContext from '../src/context/FeedbackContext'
import RatingSelect from '../src/components/RatingSelect'
describe('FeedbackForm', () => {
  let addFeedback, updateFeedback, feedbackEdit

  beforeEach(() => {
    addFeedback = jest.fn()
    updateFeedback = jest.fn()
    feedbackEdit = {
      edit: false,
      item: {},
    }
  })

  it('renders correctly with default props', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )
  })

  it('renders correctly when editing feedback', () => {
    feedbackEdit.edit = true
    feedbackEdit.item = {
      id: 1,
      text: 'Test feedback',
      rating: 10,
    }

    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )
  })

  it('disables the submit button when text is less than 10 characters', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    const input = component.root.findByProps({ name: 'formInput' })
    const button = component.root.findByType(Button)

    act(() => {
      input.props.onChange({ target: { value: 'Test' } })
    })

    expect(button.props.isDisabled).toBe(true)
  })

  it('calls addFeedback when submitting a new feedback', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    const form = component.root.findByType('form')
    const input = component.root.findByProps({ name: 'formInput' })

    act(() => {
      input.props.onChange({ target: { value: 'Test feedback' } })
    })

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() })
    })

    expect(addFeedback).toHaveBeenCalledWith({
      text: 'Test feedback',
      rating: 10,
    })
  })
  it('renders the RatingSelect component and updates the rating when a new rating is selected', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )
    const ratingSelect = component.root.findByType(RatingSelect)
    act(() => {
      ratingSelect.props.select(8)
    })

    expect(ratingSelect.props.selected).toBe(8)
  })
  it('calls the addFeedback function with the correct parameters when submitting a new feedback item', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    const form = component.root.findByType('form')
    const input = component.root.findByProps({ name: 'formInput' })
    const ratingSelect = component.root.findByType(RatingSelect)

    act(() => {
      input.props.onChange({ target: { value: 'New feedback' } })
    })

    act(() => {
      ratingSelect.props.select(3)
    })

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() })
    })

    expect(addFeedback).toHaveBeenCalledWith({
      text: 'New feedback',
      rating: 3,
    })
  })
  it('clears the input value after submission', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    const input = component.root.findByProps({ name: 'formInput' })
    const form = component.root.findByType('form')

    act(() => {
      input.props.onChange({
        target: { name: 'formInput', value: 'Test feedback' },
      })
    })

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() })
    })

    const inputValue = component.root.findByProps({ name: 'formInput' }).props
      .value
    expect(inputValue === '').toBe(true)
  })

  it('disables the submit button when the form is submitting', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    const form = component.root.findByType('form')
    const submitButton = component.root.findByType(Button)

    act(() => {
      form.props.onSubmit({ preventDefault: jest.fn() })
    })

    expect(submitButton.props.isDisabled).toBe(true)
  })
  it('displays an error message when feedback text is less than 10 characters', () => {
    const component = renderer.create(
      <FeedbackContext.Provider
        value={{ addFeedback, updateFeedback, feedbackEdit }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )
    const input = component.root.findByProps({ name: 'formInput' })
    act(() => {
      input.props.onChange({ target: { name: 'formInput', value: 'Test' } })
    })

    const errorMessage = component.root.findByProps({ name: 'errorMessage' })
    expect(errorMessage.children[0]).toBe('Text must be at least 10 characters')
  })
  // it("doesn't display an error message when feedback text is empty", () => {
  //   const component = renderer.create(
  //     <FeedbackContext.Provider
  //       value={{ addFeedback, updateFeedback, feedbackEdit }}
  //     >
  //       <FeedbackForm />
  //     </FeedbackContext.Provider>
  //   )
  //   const input = component.root.findByProps({ name: 'formInput' })
  //   act(() => {
  //     input.props.onChange({ target: { name: 'formInput', value: '' } })
  //   })
  //   try {
  //     const errorMessage = component.root.findByProps({ name: 'errorMessage' })
  //   } catch (error) {
  //     expect(error).toBeDefined();
  //     // expect(error).toBe('No instances found with props: {"name":"errorMessage"}');
  //   }
  // })
})
