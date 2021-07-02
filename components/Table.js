import React, { useState } from "react";
import { useRouter } from "next/router";

function fixedPercentage(n) {
  return parseInt(n).toFixed(0) + "%";
}

function Table({ data }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [myData, setData] = useState(data);

  async function searchData(event, value) {
    if (value) {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${value}`
      );
      const newData = await res.json();
      setData(newData);
    } else {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pgeNumber=0`
      );
      const newData = await res.json();
      setData(newData);
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative flex w-3/5 flex-wrap items-stretch mb-3 p-3">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-lock"></i>
          </span>
          <input
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onKeyUp={(event) => {
              searchData(event, value);
            }}
            type="text"
            placeholder="Search specific game"
            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded-lg text-sm border-0 shadow outline-none focus:outline-none w-full pl-10"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-myonelight2 border-separate space-y-6 text-sm">
              <thead className="bg-myone text-myonelight2">
                {value ? (
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3 text-left">Cheapest price</th>
                  </tr>
                ) : (
                  <tr className="">
                    <th className="p-3">Title</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Original price</th>
                    <th className="p-3 text-left">Saving</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {myData.map(function (deal, idx) {
                  return value ? (
                    <tr
                      onClick={() => router.push("/game" + `/${deal.gameID}`)}
                      key={idx}
                      className=" shadow-lg hover:shadow-2xl transition duration-500 ease-in-out bg-myone hover:bg-gray-700 transform-gpu hover:-translate-y-1 hover:scale-105 cursor-pointer"
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
                            <div className="font-bold">{deal.external}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{deal.cheapest}</td>
                    </tr>
                  ) : (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
