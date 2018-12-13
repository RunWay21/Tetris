import queryString from 'query-string';
import { Base64 } from 'js-base64';

export function locationToUrl(location) {
    return {
        pathname: location.pathname,
        query: queryString.parse(location.search, { arrayFormat: 'bracket' })
    };
}

export function urlToLocation(url) {
    return {
        pathname: url.pathname,
        search: '?' + queryString.stringify(url.query, { arrayFormat: 'bracket' })
    };
}

export function filterToUrl(pathname, filter) {
    return {
        pathname: pathname,
        query: filterToQuery(filter)
    };
}

export function urlToFilter(url, orderBy, sortBy) {
    return queryToFilter(url.query, orderBy, sortBy)
}


export function filterToQuery(filter) {
    const filters = filter.filters ? Object.values(filter.filters) : undefined;
    return {
        page: filter.page,
        orderBy: filter.orderBy,
        sortBy: filter.sortBy,
        filters: encodeFilters(filters)
    };
}

export function queryToFilter(query, orderBy, sortBy) {
    return {
        page: query.page ? query.page : 1,
        orderBy: query.orderBy ? query.orderBy : orderBy,
        sortBy: query.sortBy ? query.sortBy : sortBy,
        filters: decodeFilters(query.filters)
    };
}

export function locationToFilter(location, orderBy, sortBy) {
    const url = locationToUrl(location);
    return urlToFilter(url, orderBy, sortBy);
}

export function filterToLocation(pathname, filter) {
    const url = filterToUrl(pathname, filter);
    return urlToLocation(url);
}

export function decodeFilters(filters) {
    if (filters) {
        try {
            const json = Base64.decode(decodeURIComponent(filters));
            const result = JSON.parse(json);
            return result;
        } catch (error) {
            console.warn(error);
        }
    }
    return undefined;
}

export function encodeFilters(filters) {
    try {
        if (filters && filters.length > 0) {
            var json = JSON.stringify(filters);
            return encodeURIComponent(Base64.encode(json));
        }
    } catch (error) {
        console.warn(error);
    }
    return undefined;
}