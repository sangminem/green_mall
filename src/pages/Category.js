import React, { Fragment, useState } from 'react';

const Category = () => {

    const [product, setProduct] = useState([{id:0, title:"first", desc:"desc1"}, {id:1, title: "second", desc:"desc2"}]);

    return (
        <React.Fragment>
            {
                product.map((a, i) => {
                    return (
                        <React.Fragment key={i}>
                            <h2>{a.title}</h2>
                            <span>{a.desc}</span>
                        </React.Fragment>   
                    )
                })
            }
        </React.Fragment>
    );
  }


  export default Category;