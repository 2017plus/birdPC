import React, { Component } from 'react';
import { Tag, Card, message, Avatar, Spin, Icon } from 'antd';
import BlogList from './BlogList';
import './blog.css';

class BlogContainer extends Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const tagsFromServer = ['Movies', 'Books', 'Music','Music','Music','Music','Music','Music','Music','Music','Music','Music','Music','Music','Music', 'Sports'];
    const { selectedTags } = this.state;
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <div>
            <h3 style={{ marginRight: 8, display: 'inline' }}>个人分类:</h3>
            {tagsFromServer.map(tag => (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </div>
          <div>
            <h3 style={{ marginRight: 8, display: 'inline' }}>归档:</h3>
            {tagsFromServer.map(tag => (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </div>
          <div>
            <h3 style={{ marginRight: 8, display: 'inline' }}>热门文章:</h3>
            {tagsFromServer.map(tag => (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingRight: 20
          }}
        >
          <div>
            <BlogList />
          </div>
        </div>
      </div>
    );
  }
}

export default BlogContainer;
