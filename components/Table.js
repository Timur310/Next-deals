import React, { useState } from "react";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import { useRouter } from "next/router";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function fixedPercentage(n) {
  return parseInt(n).toFixed(0) + "%";
}

function Table({ data }) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [apiData, setApiData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");

  function fetchNextPage(nextPage) {
    window.scrollTo(0, 0);
    setLoading(true);
    setPage(nextPage);
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?sortBy=Metacritic&pageNumber=${nextPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            {loading ? (
              <div className="sweet-loading">
                <BounceLoader
                  css={override}
                  size={45}
                  color={"#CD113B"}
                  loading={loading}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <table className="table text-myonelight2 border-separate space-y-6 text-sm">
                <thead className="bg-myone text-myonelight2">
                  <tr className="">
                    <th className="p-3">Title</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Original price</th>
                    <th className="p-3 text-left">Saving</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map(function (deal, idx) {
                    return (
                      <tr
                        onClick={() => router.push("/game" + `/${deal.gameID}`)}
                        key={idx}
                        className="shadow-lg text-myonelight2 hover:shadow-2xl transition duration-500 ease-in-out bg-myone hover:bg-gray-700 transform-gpu hover:-translate-y-1 hover:scale-105 cursor-pointer"
                      >
                        <td className="p-3">
                          <div className="flex align-items-center">
                            <img
                              className="rounded-full h-12 w-12 object-cover"
                              src={deal.thumb}
                              alt="image"
                              width="100"
                              height="100"
                            />
                            <div className="ml-3">
                              <div className="font-bold">{deal.title}</div>
                              <div>
                                <div className="text-gray-300">
                                  Steam rating: {deal.steamRatingPercent}%
                                </div>
                                <div className="text-gray-300">
                                  Metacritic: {deal.metacriticScore}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">Technology</td>
                        <td className="p-3 font-bold">{deal.salePrice}</td>
                        <td className="p-3 font-bold text-center">
                          {deal.normalPrice}
                        </td>
                        <td className="p-3">
                          <span className="bg-blue-400 text-gray-50 rounded-md px-2">
                            {fixedPercentage(deal.savings)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
        onClick={() => {
          fetchNextPage(page - 1);
        }}
      >
        Previous Page
      </button>
      <button
        className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
        onClick={() => {
          fetchNextPage(page + 1);
        }}
      >
        Next Page
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?sortBy=Metacritic`
  );
  const data = await res.json();

  return {
    props: { data: data, page_count: res.headers.get("x-total-page-count") },
  };
}

export default Table;
