import { useEffect, useState } from "react"
import BottomForm from "./Form/BotForm"
import TopForm from "./Form/TopForm"
import axios from "axios";

function App() {
  const [search, setSearch] = useState('');
  const [getCocktail, setGetCocktail] = useState('');
  const [showResult, setShowResult] = useState(false)
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${getCocktail}`);
        const firstCocktail = response.data.drinks[0];
        const ingredients = Object.keys(firstCocktail).filter(key => key.startsWith('strIngredient') && firstCocktail[key] !== null).map(key => firstCocktail[key]);
        const measures = [];
        for (let i = 1; i <= 15; i++) {
          const measureKey = `strMeasure${i}`;
          if (firstCocktail[measureKey] !== null) {
            measures.push(convertToNumber(firstCocktail[measureKey]));
          }
        }

        setCocktail({ ...firstCocktail, ingredients, measures });
        setShowResult(true)
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    }
    if (getCocktail !== '') {
      fetchCocktail();
    }
  }, [getCocktail])

  const handleSearch = (event) => {
    event.preventDefault()
    setGetCocktail(search)
  }

  const convertToNumber = (measure) => {
    if (typeof measure === 'string') {
      if (measure.includes('oz')) {
        return parseFloat(measure.replace(' oz', ''));
      } else if (measure.includes('tsp')) {
        return parseFloat(measure.replace(' tsp', ''));
      } else if (measure.includes('Juice of')) {
        const fraction = measure.split(' ')[2];
        return eval(fraction);
      }  
    }
    return measure;
  };

  
  const handleIngredientUpdate = (index, newValue) => {
    const updatedIngredients = [...cocktail.ingredients];
    updatedIngredients[index] = newValue;
    
    setCocktail({ ...cocktail, ingredients: updatedIngredients });
  };
  
  const handleMeasureUpdate = (index, newValue) => {
    const updatedMeasures = [...cocktail.measures];
    updatedMeasures[index] = newValue;
    
    setCocktail({...cocktail, measures: updatedMeasures});
  }
  
const getTotalMeasure = () => {
  if (cocktail && cocktail.measures) {
    const total = cocktail.measures.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    return total;
  }
  return 0;
};
  
  return (
    <div className="bg-cover bg-center bg-opacity-60 min-h-screen" style={{ backgroundImage: 'url("/public/images/Bg.jpeg")' }}>
      <div className="flex py-5 flex-col justify-center items-center ">
        <div className="w-2/6 bg-black  bg-opacity-20 ">
          <h1 className="py-2 text-white text-4xl text-center font-semibold">
            RECIPE EDITOR
          </h1>
        </div>
        <TopForm>
          {showResult && cocktail && (
            <div className="flex flex-row">
              <div className="flex flex-col text-gray-400 px-2">
                {cocktail.ingredients.map((ingredient, index) =>(
                  <TopForm.HeaderIngredient
                    key={index}
                    ingredient={`${index+1}. ${ingredient}`}
                  > 

                  </TopForm.HeaderIngredient>
                ))}
              </div>
              <div className="flex flex-col text-gray-400 px-2">
                  {cocktail.measures.map((measure, index)=>(
                    <TopForm.HeaderMeasures
                      key={index}
                      measure={measure}>
                    </TopForm.HeaderMeasures>
                  ))}
              </div>

            </div>
          )}
          <div className="flex flex-row items-center justify-end px-10 py-5 font-bold">
            <TopForm.Footer></TopForm.Footer>

            <TopForm.FooterTotal
              total ={getTotalMeasure()}>

            </TopForm.FooterTotal>
          </div>
        </TopForm>
        <BottomForm>
          <BottomForm.InputForm
            onClick={handleSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}>
          </BottomForm.InputForm>
          {showResult && cocktail && (
            <div className="flex flex-row mt-5">
              <div className="flex flex-col">
                {cocktail.ingredients.map((ingredient, index) => (
                  <BottomForm.IngredientData
                    key={index}
                    placeholder={ingredient}
                    onChange={(e)=> handleIngredientUpdate(index, e.target.value)}
                  >

                  </BottomForm.IngredientData>
                ))}
              </div>
              <div className="flex flex-col">
                {cocktail.measures.map((measure, index) => (
                  <BottomForm.MeasureData
                    key={index}
                    placeholder={measure}
                    onChange={(e)=>handleMeasureUpdate(index, e.target.value)}
                  >

                  </BottomForm.MeasureData>
                ))}
              </div>
            </div>
            
          )}
        </BottomForm>
      </div>
    </div>

  )
}

export default App
