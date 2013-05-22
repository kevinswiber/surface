number        [+-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?
name          [A-Za-z0-9_-][\.A-Za-z0-9_-]*
escaped_name  \[(?:(?!\])[^\\]|\\.)*\]

%options case-insensitive

%x sel fltr asgn loc

%%

<INITIAL,sel,fltr,asgn,loc>\s+          /* skip whitespace */
"select"                                { this.begin('sel'); return 'SELECT'; }
<sel,fltr,loc>","                       return 'COMMA'
<sel>"*"                                return 'STAR'
<sel>"where"                            { this.begin('fltr'); return 'WHERE'; }
<sel>{name}                             return 'NAME'
<sel>{escaped_name}                     {
                                          yytext = yytext.slice(1, -1);
                                          return 'NAME';
                                        }
<fltr>"and"                             return 'AND'
<fltr>"or"                              return 'OR'
<fltr>"not"                             return 'NOT'
<fltr>"&&"                              return 'AND'
<fltr>"||"                              return 'OR'
<fltr><<EOF>>                           { this.popState(); return 'EOF'; }
<fltr>{name}                            { this.begin('asgn'); return 'NAME'; }
<fltr>{escaped_name}                    {
                                          this.begin('asgn');
                                          yytext = yytext.slice(1, -1);
                                          return 'NAME';
                                        }
<asgn>"eq"|"gt"|"lt"|"gte"|"lte"        return 'COMPARISON'
<asgn>"="|">"|"<"|">="|"<="             {
                                          yytext = letterify(yytext);
                                          return 'COMPARISON';
                                        }
<asgn>"contains"                        return 'CONTAINS'
<asgn>"within"                          { this.begin('loc'); return 'WITHIN'; }
<asgn>(["'])(?:(?!\1)[^\\]|\\.)*\1      { this.popState(); return 'STRING'; }
<asgn>{number}                          { this.popState(); return 'NUMBER'; }
<loc>{number}                           return 'NUMBER'
<loc>"of"                               return 'OF'
<loc>"and"                              {
                                          this.popState(); /* asgn */
                                          this.popState(); /* fltr */
                                          return 'AND';
                                        }
<loc>"or"                               {
                                          this.popState(); /* asgn */
                                          this.popState(); /* fltr */
                                          return 'OR';
                                        }
<INITIAL,loc><<EOF>>                    return 'EOF'

%%

function letterify(op) {
  switch(op) {
    case '=' : op = 'eq'; break;
    case '>' : op = 'gt'; break;
    case '<' : op = 'lt'; break;
    case '>=' : op = 'gte'; break;
    case '<=' : op = 'lte'; break;
  }

  return op;
}
