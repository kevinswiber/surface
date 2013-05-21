number [+-]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?

%options case-insensitive

%x location

%%

\s+                                     /* skip whitespace */
"select"                                return 'SELECT'
"*"                                     return 'STAR'
","                                     return 'COMMA'
"where"                                 return 'WHERE'
"and"                                   return 'AND'
"or"                                    return 'OR'
"not"                                   return 'NOT'
"&&"                                    return 'AND'
"||"                                    return 'OR'
"eq"|"gt"|"lt"|"gte"|"lte"              return 'COMPARISON'
"contains"                              return 'CONTAINS'
"within"                                { this.begin('location'); return 'WITHIN'; }
"="|">"|"<"|">="|"<="                   { yytext = letterify(yytext); return 'COMPARISON'; }
<INITIAL,location><<EOF>>               return 'EOF'
[A-Za-z][\.A-Za-z0-9_-]*                return 'NAME'
(["'])(?:(?!\1)[^\\]|\\.)*\1            return 'STRING'
{number}                                return 'NUMBER'
<location>\s+                           /* skip whitespace */
<location>"of"                          return 'OF'
<location>","                           return 'COMMA'
<location>"and"                         { this.popState(); return 'AND'; }
<location>"or"                          { this.popState(); return 'OR'; }
<location>{number}                      return 'NUMBER'

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
