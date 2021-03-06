import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getArticles, setError, getUniqueArticle, setOpinion } from 'actions/articles';

class ArticlesListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    articles: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getArticles: PropTypes.func.isRequired,
    getUniqueArticle: PropTypes.func.isRequired,
    setOpinion: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchRecipes();

  /**
    * Fetch Data from API, saving to Redux
    */


  setOpinion = (data) => {
    this.props.setOpinion(data).catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });
  }

  fetchRecipes = () => {
    this.props.getArticles().catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });
  }

  fetchRecipe = () => {
    this.props.getUniqueArticle().catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });
  }

  render = () => {
    const { Layout, articles, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    const link = (match && match.params && match.params.link) ? match.params.link : null;
    return (
      <Layout
        articleId={id}
        articleLink={link}
        error={articles.error}
        loading={articles.loading}
        articles={articles.articles}
        reFetch={() => this.fetchRecipes()}
        fetchNew={() => this.fetchRecipe()}
        opinion={data => this.setOpinion(data)}
      />
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles || {},
});

const mapDispatchToProps = {
  getArticles,
  setError,
  getUniqueArticle,
  setOpinion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListing);
