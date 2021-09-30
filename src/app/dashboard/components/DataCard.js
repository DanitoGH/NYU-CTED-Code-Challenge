import React from 'react';
import NumberFormat from 'react-number-format';

const DataCard = ({ category, data, icon, iconColor }) => {
    return (
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="mb-0">
                     <NumberFormat value={data} displayType={'text'} thousandSeparator={true} />
                  </h3>
                </div>
              </div>
              <div className="col-3">
                <div className={iconColor}>
                  <span className={icon}></span>
                </div>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">{category}</h6>
          </div>
        </div>
      </div>
    );
}

export default DataCard;