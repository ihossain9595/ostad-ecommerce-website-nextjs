import Link from "next/link";
import React from "react";

async function getData() {
  return (await (await fetch(`${process.env.HOST}/api/product/brand-list`)).json())["data"];
}

const Brands = async () => {
  const data = await getData();

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
          <span className="bodySmal mb-5 text-center">
            Explore a World of Choices Across Our Most Popular <br />
            Shopping Categories{" "}
          </span>
          {data.map((item, i) => {
            return (
              <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
                <Link href={`/my-products?brand=${item["id"]}`} className="card h-100 rounded-3 bg-white">
                  <div className="card-body">
                    <img alt="img" className="w-75" src={item["brandImg"]} />
                    <p className="bodySmal mt-3">{item["brandName"]}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
