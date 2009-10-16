<?php

   function checkSum($st) { 

    $vec = array();
     
    for($i=0;$i<9;$i+=3) {

        $sl = 0;

        for($j=$i;$j<$i+3;$j++) {

            $sl += $st[$j];
          
        }

       array_push($vec,$sl);

    } 


    for($i=0;$i<3;$i++) {

    $sc = 0;

         for($j=$i;$j<9;$j+=3) {

             $sc += $st[$j]; 
         }

       array_push($vec,$sc);
    }

    $sd = 0;

    for($i=0;$i<9;$i+=4) {

         $sd += $st[$i];
    }

    array_push($vec,$sd);

    $ssec = 0;

    for($i=2;$i<8;$i+=2) {

         $ssec += $st[$i];
    }

    array_push($vec,$ssec);

    $flag = 1;

    for($i=0;$i<8;$i++) {

         if($vec[$i] != 15) $flag = 0;
    }

    echo"<pre>";print_r($st);echo"</pre>";

    if($flag) return 1;
           else 
              return 0;


   }//end function apply

   $st = array();

   function init() {

        global $st,$k;

        $st[$k] = 0;
   }

   function have_successor() {

        global $st,$k,$n; 

        if($st[$k] < $n) {

           $st[$k]++;

           return 1; 

        } else {

           return 0;
        }
   }

   function is_valid() {

        global $st,$k; 

 
     for($i=1;$i<$k;$i++) {

            if($st[$i] == $st[$k]) return 0;
     }

     if($k==9) {

        //return checkSum($st);
     }


     return 1;
   }

   function display() {

        global $st,$n;

        for($i=1;$i<=$n;$i++) {

             echo$st[$i]." ";
        }

        echo"<br/>";
   }

   function solution() {

      global $k,$n; 

      return ($k==$n);
   }

   function back() {

      global $k;

      $k=1;init();

      while($k>0) {

        do{}while(($AS=have_successor()) && (!is_valid()));

            if($AS) {

               if(solution()) {

                  display();

               } else {

                 $k++;init();
               }

            } else {

              $k--;
            }   

      }

   }

   $n = 9;

   back();

?>