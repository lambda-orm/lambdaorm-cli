CREATE TABLE tbl_bill_cycles (cycle_day INTEGER NOT NULL ,id VARCHAR(32) NOT NULL ,name VARCHAR(100) NOT NULL ,description VARCHAR(150)  ,disabled BOOLEAN  ,created DATETIME  ,createdBy VARCHAR(50)  ,CONSTRAINT tbl_bill_cycles_PK PRIMARY KEY (id));