import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

const getStoreName = (id) => {
  const [name, setName] = useState("");
  useEffect(() => {
    fetch("/api/stores")
      .then((response) => response.json())
      .then((data) => getStore(data, id));
  }, []);

  function getStore(data, id) {
    for (let element of data) {
      if (element.storeID == id) {
        setName(element.storeName);
      }
    }
  }
  return name;
};

const game = ({ data, dealData }) => {
  const router = useRouter()
  const steamid = Object.keys(data)[0];
  const info = data[steamid];

  return (
    <div>
      <Head>
        <title>{info.data.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="p-5">
        <section className="shadow-lg rounded-lg text-myonelight body-font overflow-hidden bg-myone">
          <div className="container px-5 py-24 mx-auto">
            <div className="shadow-md bg-myonelight p-3 rounded-lg lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={info.data.header_image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-white tracking-widest">
                  App id: {info.data.steam_appid}
                </h2>
                <h1 className="text-myonelight2 text-3xl title-font font-medium mb-1">
                  {info.data.name}
                </h1>
                <p className="leading-relaxed text-white">{info.data.short_description}</p>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-myonelight2">
                    Steam price
                  </span>
                </div>
                {info.data.price_overview ? (
                  <div className="text-white">{info.data.price_overview.final_formatted}</div>
                ) : (
                  <div>Not avaliable</div>
                )}

                <div className="text-myonelight2 text-3xl title-font font-medium mb-1">
                  Release date
                </div>
                <div className="text-white">{info.data.release_date.date}</div>
                <div className="text-myonelight2 text-3xl title-font font-medium mb-1">
                  Genres
                </div>
                <div>
                  {info.data.genres.map(function (item, idx) {
                    return (
                      <span style={{backgroundColor: "#22223b"}} className="shadow-md inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 rounded-full">
                        {item.description}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block w-auto sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="w-auto divide-y divide-myonelight">
                    <thead className="bg-myone">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Store
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Saving
                        </th>
                      </tr>
                    </thead>
                    <tbody className="shadow-lg bg-white divide-y divide-gray-200">
                      {dealData.deals.map(function (deal, idx) {
                        return (
                          <tr onClick={() => router.push(`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`)} key={idx} className="transition duration-500 ease-in-out transform-gpu hover:-translate-y-1 hover:scale-105 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {getStoreName(deal.storeID)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                Sale: {deal.price}
                              </div>
                              <div className="text-sm text-gray-500">
                                Retail: {deal.retailPrice}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {parseInt(deal.savings)}%
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
        </section>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Information
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  About the game
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.about_the_game,
                    }}
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Supported languages
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.supported_languages,
                    }}
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Support</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {info.data.support_info.email}
                  <br></br>
                  {info.data.support_info.url}
                </dd>
              </div>
              <div className="grid grid-flow-col auto-cols-auto bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  PC requirements
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.pc_requirements.minimum,
                    }}
                  />
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.pc_requirements.recommended,
                    }}
                  />
                </dd>
              </div>
              <div className="grid grid-flow-col auto-cols-auto bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  MAC requirements
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.mac_requirements.minimum,
                    }}
                  />
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.mac_requirements.recommended,
                    }}
                  />
                </dd>
              </div>
              <div className="grid grid-flow-col auto-cols-auto bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Linux requirements
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.linux_requirements.minimum,
                    }}
                  />
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info.data.linux_requirements.recommended,
                    }}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`);
  const dealData = await res.json();
  //console.log(dealData.info.steamAppID)
  const steamres = await fetch(
    `http://store.steampowered.com/api/appdetails?appids=${dealData.info.steamAppID}`
  );
  const data = await steamres.json();
  //console.log(data)

  return {
    props: { data, dealData },
  };
}

export default game;
