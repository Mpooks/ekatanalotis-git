M=4;
t = (randn(M,1)+j*randn(M,1))/sqrt(2);
x= abs(t) .^ 2;
x=x.'
%x=[1,2,2.5,5];
N=4;
min_value=0;
max_value=4;
 my_quantizer1(x, N, min_value, max_value);

function [xq, centers] = my_quantizer1(x, N, min_value, max_value);

 step = (max_value - min_value)/2^N;

 low_bounds=[min_value:step:max_value-step];
 high_bounds=[min_value+step:step:max_value];
 areas=[low_bounds  ;  high_bounds]
 
    k=[]
    num_of_arreas=size(areas, 2);
    centers = mean(areas)
    centers=flipud(centers); %Centers should be sorted low to high
    for(c=1:size(x,2))
         
         if(x(c)<min_value)
            k(c) = min_value;
         elseif(x(c)>max_value)
           k(c) = max_value;
         else
           for i= 1:num_of_arreas
               if(x(c) >= areas(1,i) & x(c) <= areas(2,i))
                   k(c)=centers(i); 
                   
                   break;
               end    

           end
         end
    end
        
    Nq=0;
    P=0
 
    for (i=1:size(x,2))
       diff=k(i)-x(i);
       diff=diff^2;
       
       Nq=Nq+(diff * (exp(-x(i))));
       P=P+(x(i)^2) *exp(-x(i));
    end
    disp("Nq is");
    disp(Nq);
    disp("P is");
    disp(P);
    SQNR=P/Nq
        
    
    %theoritical calc of avg paramorfosi
    from=0;
    to=0.5;
    res=0;
   
   for (i=1:size(x,2))


    fun = @(x)((x-x(i)).^2).* exp(-x)
    res=res+integral(fun,from,to)
    
    from=from+0.5;
    to=to+0.5;
   end
    disp(res);
end
