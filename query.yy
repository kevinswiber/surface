%left OR
%left AND
%left NOT

%start root

%%

root
  : select_statement EOF
    { return $1; }
  ;

select_statement
  : SELECT fields where_clause orderby_clause
    { $$ = new yy.SelectStatementNode($2, $3, $4); }
  ; 

fields
  : column_list 
  | 'STAR'
    { $$ = new yy.FieldListNode('*'); }
  ;

column_list
  : column
    { $$ = new yy.FieldListNode($1); }
  | column_list COMMA column
    { $1.push($3); $$ = $1; }
  ;

column
  : NAME
  ;

where_clause
  : /* empty */
  | WHERE filter 
    { $$ = new yy.FilterNode($2); }
  ;

filter
  : /* empty */
  | conjunction
  | disjunction
  | predicate
  ;

conjunction
  : predicate AND predicate
    { $$ = new yy.ConjunctionNode($1, $3); }
  | conjunction AND predicate
    { $$ = new yy.ConjunctionNode($1, $3); }
  ;

disjunction
  : conjunction OR predicate
    { $$ = new yy.DisjunctionNode($1, $3); }
  | disjunction OR predicate
    { $$ = new yy.DisjunctionNode($1, $3); }
  ;

predicate
  : comparison_predicate
  | contains_predicate
  | location_predicate
  ;

comparison_predicate
  : column COMPARISON literal 
    { $$ = new yy.ComparisonPredicateNode($1, $2, $3, false); }
  | NOT column COMPARISON literal
    { $$ = new yy.ComparisonPredicateNode($2, $3, $4, true); }
  ;

contains_predicate
  : column CONTAINS STRING
    { $$ = new yy.ContainsPredicateNode($1, $3, false); }
  | NOT column CONTAINS STRING
    { $$ = new yy.ContainsPredicateNode($2, $4, true); }
  ;

location_predicate
  : column WITHIN location
    { $$ = new yy.LocationPredicateNode($1, $3, false); }
  | NOT column WITHIN location
    { $$ = new yy.LocationPredicateNode($2, $4, true); }
  ;

location
  : NUMBER OF coordinates
    { $$ = new yy.LocationNode($1, $3); }
  ;

coordinates
  : NUMBER COMMA NUMBER
    { $$ = new yy.CoordinatesNode($1, $3); }
  ;

orderby_clause
  : /* empty */
  | ORDERBY sort_list
    { $$ = new yy.OrderByNode($2); }
  ;

sort_list
  : sort_expression 
    { $$ = new yy.SortListNode($1); }
  | sort_list COMMA sort_expression
    { $1.push($3); $$ = $1; }
  ;

sort_expression
  : NAME direction
    { $$ = new yy.SortNode($1, $2); }
  ;

direction
  : /* empty */
  | ASC
  | DESC
  ;

literal
  : NUMBER
  | STRING
  ;
