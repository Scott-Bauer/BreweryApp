export const  DropdownStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid grey',
          color: state.isSelected ? 'blue' : 'black',
          padding: 5,
        }) }
        
      