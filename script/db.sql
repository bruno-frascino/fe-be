-- To run cli: 
-- sqlite3 febe.db
-- to quit: ctrl+d

CREATE TABLE RESOURCE(
  id integer NOT NULL PRIMARY KEY, 
  name text NOT NULL, 
  type text NOT NULL,
  content text,
  parentId integer,
  FOREIGN KEY(parentId) REFERENCES RESOURCE(id)
);

-- Load
-- FOLDER LVL 1
INSERT INTO RESOURCE(
  id,
  name,
  type
) 
VALUES(
  1,
  'Casa',
  'folder'
);

-- FILE LVL 1
INSERT INTO RESOURCE(
  id,
  name,
  type,
  content
) 
VALUES(
  2,
  'lawn',
  'file',
  'lots of bugs, dirt and all'
);

-- FILE LVL 2
INSERT INTO RESOURCE(
  id,
  name,
  type,
  content,
  parentId
) 
VALUES(
  3,
  'House Info',
  'file',
  'lovely house',
  1
);

-- FOLDER LVL 2
INSERT INTO RESOURCE(
  id,
  name,
  type,
  parentId
) 
VALUES(
  4,
  'Living Room',
  'folder',
  1
);