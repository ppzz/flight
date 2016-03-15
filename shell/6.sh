#!/bin/bash
a=10
b=20

echo "a=$a,b=$b"

val=`expr $a + $b`
echo "a+b=${val}"

val=`expr $a - $b`
echo "a-b=${val}"

val=`expr $a \* $b`
echo "a*b=$val"

val=`expr $a / $b`
echo "a/b=$val"

if [ $a = $b ]
  then
    echo "a equal to b!"
fi

if [ $a != $b ]
  then 
    echo "a is not equal to b!"
fi

echo "--------------------"

if [ $a -eq $b ]
  then
    echo "$a -eq $b : a is equal to b "
else
  echo "$a -eq $b ：　ａis not equal to b"
fi

if [ $a -ne $b ]
  then
    echo "$a -ne $b : a is not equal to b "
else
  echo "$a -ne $b ：　ａis equal to b"
fi

if [ $a -gt $b ]
  then
    echo "$a -gt $b : a is greater to b "
else
  echo "$a -gt $b ：　ａis not greater to b"
fi

if [ $a -lt $b ]
  then
    echo "$a -lt $b : a is less than b "
else
  echo "$a -lt $b ：　ａis less than b"
fi

if [ $a -ge $b ]
  then
    echo "$a -ge $b : a is greater or equal to b "
else
  echo "$a -ge $b ：　ａis not greater or equal to b"
fi

if [ $a -le $b ]
  then
    echo "$a -le $b : a is less or equal to b "
else
  echo "$a -le $b ：　ａis not less or equal to b"
fi
