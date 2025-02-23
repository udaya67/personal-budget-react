import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetCharts from '../components/BudgetCharts';

function HomePage() {
    const [budgetData, setBudgetData] = useState([]);

    useEffect(() => {
        console.log('Fetching budget data...');
        axios.get('http://localhost:3000/budget')
            .then((res) => {
                if (res.data && res.data.myBudget) {
                    setBudgetData(res.data.myBudget);
                } else {
                    console.error('myBudget field is missing in the response');
                }
            })
            .catch((error) => {
                console.error('Error fetching budget data:', error);
            });
    }, []);

    return (
        <div className="container center">
            <div className="page-area">

                <article className="text-box">
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article className="text-box">
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article className="text-box">
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <div className="charts">
                    <BudgetCharts data={budgetData} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;


