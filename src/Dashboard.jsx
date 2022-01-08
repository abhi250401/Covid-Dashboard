import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CountUp from "react-countup";
import { Bar, Scatter } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
const Wrapper = styled.div`
    padding: 1em;
    margin: 1em;
    width:240px;
        box-shadow:2px 2px 6px 0px  rgba(0 , 0 , 0 ,0.3);
        transition:transform .3s;
    border-radius: 6px;
    background: linear-gradient(
        to right,
        ${(props) => props.inputColor1 || "green"},
        ${(props) => props.inputColor2 || "red"}
    );
    &:hover {
         transform:translateY(-5px);
         box-shadow:2px 2px 26px 0px rgba(0,0,0,0.3);
      };

    
`;

const Headings = styled.p`
  color: ${(props) => props.inputColor || "white"};
  padding: 0px;
  
`;
const Title = styled.h1`
  font-size: 1.5em;
  color: #334e93;
  padding-left: 0.5em;
  margin-top: 0.5em;
`;

const CardDiv = styled.div`
  margin: 2em;
  padding: 0.5em;
  margin-bottom:0px;
      border-radius:8px;
  background:#FFFFFF
  ;
  display: grid;
  grid-gap:20px;
  align-items:center;
  grid-template-columns: repeat(4, 1fr);
  backgrond: #ffffff;
  @media (max-width: 1000px) {
    grid-template-columns:repeat(3,1fr);
  };
  @media (max-width: 600px) {
    grid-template-columns:repeat(2,1fr);
    margin-top:
  };
  @media (max-width: 500px) {
    grid-template-columns:repeat(1,1fr);
  }
`;
const SubHeading = styled.p`
  color: white;
  font-size: 1.2em;
  font-weight: bolder;
`;
const Container = styled.div`
  margin: 1em;
  padding-left:10px;
  width:400px;
  background:;
  justify-content:center;
  
`;
const Input = styled.input`
  margin-left: 1.2em;
  padding: 8px;
  display:flex;
  justify-content:center;
  background:#F4F6FA;
  font-size:1em;  font-weight:800;

  color:#8E97B5;
  border-radius:6px;
  
`;
const Button = styled.button`
    /* Adapt the colors based on primary prop */
    color:#F4F6FA;
    font-weight:300;
    background:#8E97B5;
  
   
    border-radius:5px;
    font-size: 1.1em;
    margin-left: 1.2em;
   
    padding: 0.4em 1em;
    &:hover{
        background:#ffffff;
        color:#000000;
    }
`;
const StyledText = styled.span`
color:${(props) => props.inputColor} ;
font-size:${(props) => props.fontSize};
font-weight:600;
`;
const InfoCard = styled.div`
padding:0.5em;
height:fit-content;
width:30%;
margin:auto;
background:#eee599;
`

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const Search = async () => {
        await axios
            .get(
                `https://corona.lmao.ninja/v2/countries/${country}?yesterday=true&strict=true&query=`
            )
            .then((res) => {
                console.log(res.data);
                setLoading(true);
                setData(res.data);
                setImg(res.data.countryInfo.flag);

            })
            .catch((err) => {
                setCountry(value);
                alert('Country does not exist')
                console.log(err);
            });
    };

    const [img, setImg] = useState("");
    const [country, setCountry] = useState("india");
    const [value, setValue] = useState("india");
    const [data, setData] = useState();
    useEffect(() => {
        Search();
    }, [country]);

    return (
        <>
            <CardDiv>

                <Wrapper inputColor2="#3FEFC1" inputColor1="#23C0EB">
                    <Headings>Confirmed Cases</Headings>
                    <SubHeading>

                        <CountUp end={data && data.cases} separator="," duration={2} />
                        <span> (+<CountUp end={data && data.todayCases} separator="," duration={2} />)</span>
                    </SubHeading>
                </Wrapper>
                <Wrapper inputColor1="#417EFD" inputColor2="#8EA1FF">
                    <Headings>Active </Headings>
                    <SubHeading>
                        <CountUp end={data && data.active} separator="," duration={2} />
                    </SubHeading>
                </Wrapper>
                <Wrapper inputColor1="#32D3A2" inputColor2="#8FE8AE">
                    <Headings>Recovered</Headings>
                    <SubHeading>
                        <CountUp end={data && data.recovered} separator="," duration={2} />

                        <span>(+<CountUp end={data && data.todayRecovered} separator="," duration={2} />)</span>
                    </SubHeading>
                </Wrapper>
                <Wrapper inputColor1="#AF47FE" inputColor2="#D88AFF">
                    <Headings>Deaths </Headings>
                    <SubHeading>
                        <CountUp end={data && data.deaths} separator="," duration={2} />
                        <span>(+<CountUp end={data && data.todayDeaths} separator="," duration={2} />)</span>
                    </SubHeading>
                </Wrapper>

            </CardDiv>
            <div style={{ width: "40%", display: "grid", gridTemplateColumns: "repeat(2,1fr)", }}>
                <Container >
                    <Title>Statistics</Title>
                    <div style={{ display: "flex" }}>
                        <Input
                            placeholder="Enter Country Name"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                        <Button primary onClick={() => setCountry(value)}>Search</Button></div>

                    <img src={img} alt="flag" style={{ margin: "1.2em", paddingLeft: "10px", }} />

                </Container>
                <div style={{

                    marginTop: "5em",
                    justifyContent: "center",
                    width: "100%",


                    height: "fit-content",


                }}>
                    <CardDiv>
                        <Wrapper inputColor1="#FE8F8F" inputColor2="#B762C1">  <StyledText fontSize="4rem">1 </StyledText><span >in every
                            <StyledText fontSize="2rem" > {data && data.oneCasePerPeople} </StyledText>
                            persons is found Covid positive in <StyledText fontSize="2rem"> {data && data.country}. </StyledText>
                        </span></Wrapper>
                        <Wrapper inputColor1="#FF416C" inputColor2="#FF4B2B">  <StyledText fontSize="4rem">1 </StyledText><span >in every
                            <StyledText fontSize="2rem"> {data && data.oneDeathPerPeople} </StyledText>
                            persons die due to Covid-19 <StyledText fontSize="2rem" > {data && data.country}.</StyledText>
                        </span></Wrapper>
                        <Wrapper inputColor1="#FE8F8F" inputColor2="#B762C1">  <StyledText fontSize="4rem">1 </StyledText><span >in every
                            <StyledText fontSize="2rem" > {data && data.oneTestPerPeople} </StyledText>
                            persons is Tested for Covid in <StyledText fontSize="2rem"> {data && data.country}. </StyledText>
                        </span></Wrapper></CardDiv>

                </div>

            </div>
            {data ? (<div style={{ padding: "4em" }}>
                <Bar

                    data={{
                        labels: ["Infected", "Recovered", "Deaths"],
                        datasets: [
                            {
                                label: "People",
                                backgroundColor: [
                                    "rgba(0, 0, 255, 0.5)",
                                    "rgba(0, 255, 0, 0.5)",
                                    "rgba(255, 0, 0, 0.5)"
                                ],
                                data: [data.todayCases, data.todayRecovered, data.todayDeaths]
                            }
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in` }
                    }}
                />
            </div>) : null}
        </>
    );
};

export default Dashboard;
