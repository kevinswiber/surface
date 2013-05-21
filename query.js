/* parser generated by jison 0.4.4 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var query = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"select_statement":4,"EOF":5,"SELECT":6,"fields":7,"where_clause":8,"column_list":9,"STAR":10,"column":11,"COMMA":12,"NAME":13,"WHERE":14,"filter":15,"conjunction":16,"disjunction":17,"predicate":18,"AND":19,"OR":20,"comparison_predicate":21,"contains_predicate":22,"location_predicate":23,"COMPARISON":24,"literal":25,"NOT":26,"CONTAINS":27,"STRING":28,"WITHIN":29,"location":30,"NUMBER":31,"OF":32,"coordinates":33,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"SELECT",10:"STAR",12:"COMMA",13:"NAME",14:"WHERE",19:"AND",20:"OR",24:"COMPARISON",26:"NOT",27:"CONTAINS",28:"STRING",29:"WITHIN",31:"NUMBER",32:"OF"},
productions_: [0,[3,2],[4,3],[7,1],[7,1],[9,1],[9,3],[11,1],[8,0],[8,2],[15,0],[15,1],[15,1],[15,1],[16,3],[16,3],[17,3],[17,3],[18,1],[18,1],[18,1],[21,3],[21,4],[22,3],[22,4],[23,3],[23,4],[30,3],[33,3],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.SelectStatementNode($$[$0-1], $$[$0]); 
break;
case 4: this.$ = new yy.FieldListNode('*'); 
break;
case 5: this.$ = new yy.FieldListNode($$[$0]); 
break;
case 6: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 9: this.$ = new yy.FilterNode($$[$0]); 
break;
case 14: this.$ = new yy.ConjunctionNode($$[$0-2], $$[$0]); 
break;
case 15: this.$ = new yy.ConjunctionNode($$[$0-2], $$[$0]); 
break;
case 16: this.$ = new yy.DisjunctionNode($$[$0-2], $$[$0]); 
break;
case 17: this.$ = new yy.DisjunctionNode($$[$0-2], $$[$0]); 
break;
case 21: this.$ = new yy.ComparisonPredicateNode($$[$0-2], $$[$0-1], $$[$0], false); 
break;
case 22: this.$ = new yy.ComparisonPredicateNode($$[$0-2], $$[$0-1], $$[$0], true); 
break;
case 23: this.$ = new yy.ContainsPredicateNode($$[$0-2], $$[$0], false); 
break;
case 24: this.$ = new yy.ContainsPredicateNode($$[$0-2], $$[$0], true); 
break;
case 25: this.$ = new yy.LocationPredicateNode($$[$0-2], $$[$0], false); 
break;
case 26: this.$ = new yy.LocationPredicateNode($$[$0-2], $$[$0], true); 
break;
case 27: this.$ = new yy.LocationNode($$[$0-2], $$[$0]); 
break;
case 28: this.$ = new yy.CoordinatesNode($$[$0-2], $$[$0]); 
break;
}
},
table: [{3:1,4:2,6:[1,3]},{1:[3]},{5:[1,4]},{7:5,9:6,10:[1,7],11:8,13:[1,9]},{1:[2,1]},{5:[2,8],8:10,14:[1,11]},{5:[2,3],12:[1,12],14:[2,3]},{5:[2,4],14:[2,4]},{5:[2,5],12:[2,5],14:[2,5]},{5:[2,7],12:[2,7],14:[2,7],24:[2,7],27:[2,7],29:[2,7]},{5:[2,2]},{5:[2,10],11:20,13:[1,9],15:13,16:14,17:15,18:16,21:17,22:18,23:19,26:[1,21]},{11:22,13:[1,9]},{5:[2,9]},{5:[2,11],19:[1,23],20:[1,24]},{5:[2,12],20:[1,25]},{5:[2,13],19:[1,26]},{5:[2,18],19:[2,18],20:[2,18]},{5:[2,19],19:[2,19],20:[2,19]},{5:[2,20],19:[2,20],20:[2,20]},{24:[1,27],27:[1,28],29:[1,29]},{11:30,13:[1,9]},{5:[2,6],12:[2,6],14:[2,6]},{11:20,13:[1,9],18:31,21:17,22:18,23:19,26:[1,21]},{11:20,13:[1,9],18:32,21:17,22:18,23:19,26:[1,21]},{11:20,13:[1,9],18:33,21:17,22:18,23:19,26:[1,21]},{11:20,13:[1,9],18:34,21:17,22:18,23:19,26:[1,21]},{25:35,28:[1,37],31:[1,36]},{28:[1,38]},{30:39,31:[1,40]},{24:[1,41],27:[1,42],29:[1,43]},{5:[2,15],19:[2,15],20:[2,15]},{5:[2,16],20:[2,16]},{5:[2,17],20:[2,17]},{5:[2,14],19:[2,14],20:[2,14]},{5:[2,21],19:[2,21],20:[2,21]},{5:[2,29],19:[2,29],20:[2,29]},{5:[2,30],19:[2,30],20:[2,30]},{5:[2,23],19:[2,23],20:[2,23]},{5:[2,25],19:[2,25],20:[2,25]},{32:[1,44]},{25:45,28:[1,37],31:[1,36]},{28:[1,46]},{30:47,31:[1,40]},{31:[1,49],33:48},{5:[2,22],19:[2,22],20:[2,22]},{5:[2,24],19:[2,24],20:[2,24]},{5:[2,26],19:[2,26],20:[2,26]},{5:[2,27],19:[2,27],20:[2,27]},{12:[1,50]},{31:[1,51]},{5:[2,28],19:[2,28],20:[2,28]}],
defaultActions: {4:[2,1],10:[2,2],13:[2,9]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.0 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            if (this.options.backtrack_lexer) {
                delete backup;
            }
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        if (this.options.backtrack_lexer) {
            delete backup;
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 6
break;
case 2:return 10
break;
case 3:return 12
break;
case 4:return 14
break;
case 5:return 19
break;
case 6:return 20
break;
case 7:return 26
break;
case 8:return 19
break;
case 9:return 20
break;
case 10:return 24
break;
case 11:return 27
break;
case 12: this.begin('location'); return 29; 
break;
case 13: yy_.yytext = letterify(yy_.yytext); return 24; 
break;
case 14:return 5
break;
case 15:return 13
break;
case 16:return 28
break;
case 17:return 31
break;
case 18:/* skip whitespace */
break;
case 19:return 32
break;
case 20:return 12
break;
case 21: this.popState(); return 19; 
break;
case 22: this.popState(); return 20; 
break;
case 23:return 31
break;
}
},
rules: [/^(?:\s+)/i,/^(?:select\b)/i,/^(?:\*)/i,/^(?:,)/i,/^(?:where\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:eq|gt|lt|gte|lte\b)/i,/^(?:contains\b)/i,/^(?:within\b)/i,/^(?:=|>|<|>=|<=)/i,/^(?:$)/i,/^(?:[A-Za-z][\.A-Za-z0-9_-]*)/i,/^(?:(["'])(?:(?!\1)[^\\]|\\.)*\1)/i,/^(?:([+-]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?))/i,/^(?:\s+)/i,/^(?:of\b)/i,/^(?:,)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:([+-]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?))/i],
conditions: {"location":{"rules":[14,18,19,20,21,22,23],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}}
};
function letterify(op) {
  switch(op) {
    case '=' : op = 'eq'; break;
    case '>' : op = 'gt'; break;
    case '<' : op = 'lt'; break;
    case '>=' : op = 'gte'; break;
    case '<=' : op = 'lte'; break;
  }

  return op;
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = query;
exports.Parser = query.Parser;
exports.parse = function () { return query.parse.apply(query, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}