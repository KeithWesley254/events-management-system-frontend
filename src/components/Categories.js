import React from 'react'
import { useNavigate } from 'react-router-dom';

const Categories = ({categories}) => {
    const navigate = useNavigate();
  return (
    <>
        <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
            {categories.map((category) => {
                return (
                    <div key={category.id}>
                        
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
                            }}
                            onClick={() => navigate(`/specific-category/${category.id}`)}
                            >
                            <p style={{fontSize: 15, marginTop: 10, color: "#1d0a3c", fontWeight: "bolder"}}>{category.title}</p>
                            </div>

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