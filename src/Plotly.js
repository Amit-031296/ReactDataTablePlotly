import React from 'react';
import Plot from 'react-plotly.js';

export default function Plotly ({priceArray}){
    // console.log(priceArray);

    return(
        <div>
            <Plot
                data={(priceArray)?[
                    {
                        x: priceArray.map(k=>k.title),
                        y: priceArray.map(k=>k.price),
                        type :'bar',
                    },
                ]:0}
                layout={{width: 600, height: 500, xaxis: {title:"Mobile names"}, yaxis:{title:"price"}, title:'Mobile Price Plot'}}
                />

        </div>
    );
};