import * as React from 'react'

export const Square = (props) => {

  const getValue = () => {
    const value = props.value;
    console.log('get value function')
    console.log(value);
    if (!value.isRevealed) {
      return value.isFlagged ? '🚩' : null;
    } else if (value.isMine) {
      return '💣';
    } else if (value.neighbour === 0) {
      return null;
    } else {
      console.log(value.neighbour)
      return value.neighbour;
    }
  }


  let className =
      "cell" +
      (props.value.isRevealed ? "" : " hidden") +
      (props.value.isMine ? " is-mine" : "") +
      (props.value.isFlagged ? " is-flag" : "");

    // console.log(className)

  return (
    <div
      className={className}
      onClick={props.onClick}
      onContextMenu={props.cMenu}
    >
      {getValue()}
    </div>
  )
}