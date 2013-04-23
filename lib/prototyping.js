var consoleColor={
    red   : '\033[31m',
    blue  : '\033[34m',
    green:  '\033[32m',
    purple:  '\033[35m',
    brown:  '\033[33m',
    cyan:  '\033[36m',
    reset : '\033[0m'
}

exports.addProto=function(){
    String.prototype.red=function(){
        return consoleColor.red + this + consoleColor.reset;
    }
    String.prototype.blue=function(){
        return consoleColor.blue + this + consoleColor.reset;
    }
    String.prototype.green=function(){
        return consoleColor.green + this + consoleColor.reset;
    }
    String.prototype.purple=function(){
        return consoleColor.purple + this + consoleColor.reset;
    }
    String.prototype.cyan=function(){
        return consoleColor.cyan + this + consoleColor.reset;
    }
}