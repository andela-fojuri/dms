import React from 'react';
import expect from 'expect';
import FroalaEditor from 'react-froala-wysiwyg';
import ReactPaginate from 'react-paginate';
import { shallow, mount, render } from 'enzyme';
import { DocumentForm } from '../../components/document/DocumentForm';
import { DocumentGrid } from '../../components/document/DocumentGrid';

function DocForm(id, content, access, title, userId) {
  const props = {
    showDocument:
    {
      id,
      content,
      access,
      title,
      userId
    }
  };
  return shallow(<DocumentForm {...props} />);
}

function DocGrid() {
  const props = {
    documents: []
  };
  return shallow(<DocumentGrid {...props} />);
}

describe('Document component suite', () => {
  describe('Document Form', () => {
    const wrapper = DocForm(0, 'Hello', 'Role', 'my_Doc', 2);
    it('contains a form', () => {
      expect(wrapper.find('form').length).toBe(1);
    });

    it('contains a TextInput', () => {
      expect(wrapper.find('TextInput').length).toBe(1);
    });

    it('contains a button and Editor', () => {
      expect(wrapper.contains(<div className="row" />)).toBeTrue;
      expect(wrapper.contains(<input type="button" />)).toBeTrue;
      expect(wrapper.contains(<FroalaEditor name="content" />)).toBeTrue;
    });
  });

  describe('Document Grid', () => {
    const wrapper = DocGrid();
    it('contains a Card and ReactPaginate', () => {
      expect(wrapper.contains(<div className="card" />)).toBeTrue;
      expect(wrapper.contains(<ReactPaginate activeClassName="active" />)).toBeTrue;
    });
  });
});

