import { useState } from 'react';
import { Buffer } from 'buffer';

import axios from 'axios';
import ipaddr from 'ipaddr.js';
const PaginatedList = () => {
  const [cursor, setCursor] = useState<{
    next: string;
    prev: string;
  }>({
    next: '',
    prev: '',
  });

  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');
  const baseurl = `https://search.censys.io/api/v2/hosts/search?q=${query}&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE`;
  const apikey = import.meta.env.VITE_CENSYS_API_KEY;
  const apiSecret = import.meta.env.VITE_CENSYS_API_SECRET;
  const apiCredentials = Buffer.from(`${apikey}:${apiSecret}`).toString(
    'base64'
  );

  const handleClick = async () => {
    let searchResults;

    axios
      .get(baseurl, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            'fb9f70ae-b7c1-454f-be21-b4220d2bf972:andKBrYYZ7PYbxecYRkoJJ5uo8kiPI7M'
          ).toString('base64')}`,
        },
      })
      .then((response) => {
        searchResults = response.data;

        console.log(searchResults.result);
        setData(
          searchResults.result?.hits.map((item: any) => ({
            ip: item.ip,
            protocolCount: item.services?.length,
          }))
        );

        if (
          searchResults.result.links &&
          searchResults.result.links.next.length > 0
        )
          setCursor({
            ...cursor,
            next: `${baseurl}&cursor=${searchResults.result.links.next}`,
            prev: `${baseurl}&cursor=${searchResults.result.links.prev}`,
          });
      });
  };

  const handleNextPage = async () => {
    let searchResults;
    if (!cursor.next) return;
    axios
      .get(cursor.next, {
        headers: {
          Authorization:
            `Basic ${Buffer.from(
              'fb9f70ae-b7c1-454f-be21-b4220d2bf972:andKBrYYZ7PYbxecYRkoJJ5uo8kiPI7M'
            ).toString('base64')}` || `Basic ${apiCredentials}`,
        },
      })
      .then((response) => {
        searchResults = response.data;
        if (searchResults.result.hits.length > 0) {
          console.log(searchResults);
          setData(
            searchResults.result?.hits.map((item: any) => ({
              ip: item.ip,
              protocolCount: item.services?.length,
            }))
          );
          setCursor({
            ...cursor,
            next: `${baseurl}${
              searchResults.result.links.next
                ? `&cursor=${searchResults.result.links.next}`
                : ''
            }`,
            prev: `${baseurl}${
              searchResults.result.links.prev
                ? `&cursor=${searchResults.result.links.prev}`
                : ''
            }`,
          });
        }
      });
  };
  const handlePrevPage = async () => {
    let searchResults;
    if (!cursor.prev) return;
    axios
      .get(cursor.prev, {
        headers: {
          Authorization:
            `Basic ${Buffer.from(
              'fb9f70ae-b7c1-454f-be21-b4220d2bf972:andKBrYYZ7PYbxecYRkoJJ5uo8kiPI7M'
            ).toString('base64')}` || `Basic ${apiCredentials}`,
        },
      })
      .then((response) => {
        searchResults = response.data;
        console.log(searchResults);
        setData(
          searchResults.result?.hits.map((item: any) => ({
            ip: item.ip,
            protocolCount: item.services?.length,
          }))
        );
        setCursor({
          ...cursor,
          next: `${baseurl}${
            searchResults.result.links.next
              ? `&cursor=${searchResults.result.links.next}`
              : ''
          }`,
          prev: `${baseurl}${
            searchResults.result.links.prev
              ? `&cursor=${searchResults.result.links.prev}`
              : ''
          }`,
        });
        console.log(cursor);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',

          width: '100%',
        }}
      >
        <input
          style={{
            height: 32,
            fontSize: 16,
            textAlign: 'center',
          }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search"
          data-testid="search-input"
        />
        <button onClick={handleClick} data-testid="search-button">
          search
        </button>
      </form>
      <ul data-testid="results-list">
        {data?.map((item) => {
          if (ipaddr.parse(item.ip).kind() === 'ipv4') {
            return (
              <li
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={item.ip}
                data-testid={`result-item-${item.ip}`}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  IP ADDRESS: {item.ip}:{' '}
                </span>
                <div>{item.protocolCount}</div>
              </li>
            );
          }
        })}
      </ul>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data-testid="pagination-controls"
      >
        <button
          disabled={!cursor.prev}
          style={{ marginRight: 4 }}
          onClick={handlePrevPage}
          data-testid="prev-button"
        >
          prev
        </button>
        <button
          style={{ marginLeft: 4 }}
          onClick={handleNextPage}
          data-testid="next-button"
          disabled={!cursor.next}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
