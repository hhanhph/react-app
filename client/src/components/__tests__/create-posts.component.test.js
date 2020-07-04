import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import CreatePosts from '../create-posts.component';
 
describe('CreatePost Component', () => {
 
    it('has an h3 tag', () => {
     //Test here
     const component = ReactTestUtils.renderIntoDocument(<CreatePosts/>);    
     var h3 = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'h3'
     )
    });
   
    it('input is wrapped inside a btn class', () => {
     //Test here
     const component = ReactTestUtils.renderIntoDocument(<CreatePosts/>);    
     var classN = ReactTestUtils.findRenderedDOMComponentWithClass(
      component, 'btn btn-primary')
    })
  })