import "tailwindcss/tailwind.css";
import Table from "../components/Table";
import Header from "../components/Header";

function Index({ data, pages }) {
  return (
    <div>
      <Header/>
      <Table data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?sortBy=Metacritic`
  );
  const data = await res.json();

  return {
    props: { data: data, pages: res.headers.get("x-total-page-count") },
  };
}

export default Index;
