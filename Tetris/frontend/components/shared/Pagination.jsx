import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { locationToUrl, urlToLocation } from 'root/utils/url';

export default class Pagination extends React.Component {
    static propTypes = {
        page: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.delta = 2;
    }

    PagesBuilder(page) {
        let pages = [{ number: 1, skip: false }];
        const start = Math.max(page.currentPage - this.delta, 2);
        const end = Math.min(page.currentPage + this.delta, page.totalPages);
        if (start - 1 > 1)
            pages.push({ number: start - 1, skip: true });
        for (let i = start; i <= end; i++)
            pages.push({ number: i, skip: false });
        if (page.totalPages - end > 0) {
            if (page.totalPages - end > 1)
                pages.push({ number: page.totalPages - 1, skip: true });
            pages.push({ number: page.totalPages, skip: false });
        }
        return pages;
    }

    render() {
        return (
            <div>
                <nav role='navigation' aria-label='pagination' className='pagination'>
                    <ul className='pagination-list'>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </div>
        );
    }

    renderLinks() {
        let url = locationToUrl(this.props.location);
        const pages = this.PagesBuilder(this.props.page);
        return pages.map(page => {
            if (page.skip) {
                return <li className='pagination-ellipsis' key={page.number}></li>
            }
            url.query.page = page.number;
            return (
                <li key={page.number}>
                    <Link className={classNames('pagination-link', { 'is-current': page.number == this.props.page.currentPage })}
                        to={urlToLocation(url)}>
                        {page.number.toString()}
                    </Link>
                </li>
            );
        });
    }
}