import React, { useMemo } from "react";

import { colorsToSort } from "~/styles/colors";
import { Container } from "./styles";

interface ITemporaryAvatar {
  name: string;
}

export interface IColor {
  text: string;
  back: string;
}

const TemporaryAvatar: React.FC<ITemporaryAvatar> = ({ name }) => {
  const color = useMemo(() => {
    const sortedNumber = Math.floor(Math.random() * 6);
    return colorsToSort[sortedNumber];
  }, []);

  const customName = useMemo(() => {
    const splitedName = name.split(" ");

    if (splitedName.length >= 2) {
      return (
        splitedName[0][0].toLocaleUpperCase() +
        splitedName[1][0].toLocaleUpperCase()
      );
    }

    return (
      splitedName[0][0].toLocaleUpperCase() +
      splitedName[0][1].toLocaleLowerCase()
    );
  }, [name]);

  return <Container sortedColor={color}>{customName}</Container>;
};

export default TemporaryAvatar;
