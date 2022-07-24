import Header from "../../components/Header/Header";
import { goToDetailPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import Pichu from "../../assets/img/pichu.gif";
import PokeClose from "../../assets/img/pokeClose.png";
import GlobalContext from "../../components/Global/GlobalContext";
import { typesIcons } from "../../components/PokeTypes/PokemonTypeIcons"
import { useContext, useEffect } from "react";
import {
  Container,
  CardContainer,
  PokemonsImg,
  Name,
  Type,
  TypeImg,
  PichuContainer,
  Msg,
  ButtonsContainer,
} from "./Styled";


export default function Pokedex() {
  const navigate = useNavigate();
  const { pokedex, setPokedex } =
    useContext(GlobalContext);

  const removeFromPokedex = (RemovePoke) => {
    const newList = pokedex.filter((poke) => {
      return poke?.name !== RemovePoke?.name;
    });
    setPokedex(newList);
    localStorage.setItem("pokedex", JSON.stringify(newList));
    alert('Pokemon removido!')
  };

  useEffect(() => {
    const storagePokedex = JSON.parse(localStorage.getItem("pokedex") || "[]");
    storagePokedex && setPokedex(storagePokedex);
  }, []);

  const pokedexPage = pokedex?.map((item) => {
    return (
      <CardContainer key={item.id} type={item?.types[0]?.type?.name}>
        <span>
          {item?.id < 10
            ? "00" + item?.id
            : item?.id >= 10 && item?.id < 100
            ? "0" + item?.id
            : item?.id}
        </span>
        <PokemonsImg
          //  src={`https://professorlotus.com/Sprites/${item.name}.gif`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item?.id}.png`}
          alt={item?.id}
          onClick={() => goToDetailPage(navigate, item?.id)}
        />
        <Name>{item?.name}</Name>
        <Type>
        <TypeImg src={typesIcons[item?.types[0].type.name]} />
        <TypeImg src={typesIcons[item?.types[1]?.type.name]} />
        </Type>
        <ButtonsContainer>
          <img className="pokeClose"
            onClick={() => removeFromPokedex(item)}
            src={PokeClose}
            alt={"Remover da Pokedex"}
          />
        </ButtonsContainer>
      </CardContainer>
    );
  });

  return (
    <>
      <Header page={"pokedex"} />
      {pokedexPage?.length == 0 ? (
        <PichuContainer>
          <img src={Pichu} alt="pichu" />
          <Msg>Sua Pokedex está vazia</Msg>
        </PichuContainer>
      ) : (
        <Container>{pokedexPage}</Container>
      )}
    </>
  );
}
