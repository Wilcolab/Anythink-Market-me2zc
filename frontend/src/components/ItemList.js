import React from "react";
import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0 && !props.searchTerm) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  if(props.items.length === 0 && props.searchTerm) {
    return <div className="py-4 no-items">No items found for "{props.searchTerm}".</div>
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
