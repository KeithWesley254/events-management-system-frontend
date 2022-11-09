import React from 'react'
import { Link } from 'react-router-dom';

const Categories = ({categories}) => {
  return (
    <>
        <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
            {categories.map((category) => {
                return (
                    <div key={category.id}>
                        <Link style={{textDecoration: "none", color: "black"}} href={`/eventcategories/${category.id}`}>
                            <div style={{
                            textAlign: "center", 
                            border: 1, 
                            borderStyle: "solid", 
                            width: 280, 
                            height: 50, 
                            padding: 2, 
                            cursor: "pointer", 
                            borderRadius: 10,
                            boxShadow: "5px 5px #d1410a"
                            }}>
                            <p style={{marginTop: 10}}><b>{category.title}</b></p>
                            </div>
                        </Link>
                        &nbsp;
                        &nbsp;
                    </div>
                );
            })}
        </div>
    </>
  )
}

export default Categories;