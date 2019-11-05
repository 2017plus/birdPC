import React, { Component } from 'react';
import { List, Card, message, Avatar, Spin, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './blog.css';

class BlogList extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    const data = {
      results: [
        {
          title: 'Title 1'
        },
        {
          title: 'Title 2'
        },
        {
          title: 'Title 3'
        },
        {
          title: 'Title 4'
        },
        {
          title: 'Title 5'
        },
        {
          title: 'Title 6'
        },
        {
          title: 'Title 7'
        },
        {
          title: 'Title 8'
        },
        {
          title: 'Title 9'
        },
        {
          title: 'Title 10'
        }
      ]
    };
    callback(data);
  };

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 49) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
      >
        <List
          grid={{ gutter: 20, column: 4 }}
          dataSource={this.state.data}
          loadMore
          renderItem={item => (
            <List.Item>
              <div
                onClick={() => {
                  message.success('2324');
                }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      style={{ height: 200 }}
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Card.Meta
                    title={item.title}
                    description="www.instagram.com"
                  />
                </Card>
              </div>
            </List.Item>
          )}
        >
          {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
              正在加载...
            </div>
          )}
        </List>
      </InfiniteScroll>
    );
  }
}

export default BlogList;
