import { QueryModel } from "../models/queryModel";

export function ConvertQueryModelToRequestQuery(query: QueryModel): string {
    let queryString = "";

    if (query.filter) {
        queryString += `filter=${encodeURIComponent(query.filter)}&`;
    }

    if(query.selectedDropdownValue) {
        queryString += `selectedDropdownValue=${encodeURIComponent(query.selectedDropdownValue)}&`;
    }

    if (query.orderBy) {
        queryString += `orderby=${encodeURIComponent(query.orderBy)}&`;
    }

    if (query.top !== undefined) {
        queryString += `top=${query.top}&`;
    }

    if (query.skip !== undefined) {
        queryString += `skip=${query.skip}&`;
    }

    // Remove the trailing '&' if it exists
    if (queryString.endsWith('&')) {
        queryString = queryString.slice(0, -1);
    }

    return queryString ? `?${queryString}` : "";
}