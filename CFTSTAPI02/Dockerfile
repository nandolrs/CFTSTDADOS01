#------------------------------------------------------------------------------------------------------------
# .net 
#------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTAPI02/*.csproj					       ./CFTSTAPI02/        
COPY CFTSTREGRAS01/*.csproj      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/*.csproj  				   ./CFTSTDADOS01/  

RUN dotnet restore

# copy everything else and build app
COPY CFTSTAPI02/.					       ./CFTSTAPI02/        
COPY CFTSTREGRAS01/.      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/.  				   ./CFTSTDADOS01/  

WORKDIR /app/CFTSTAPI02
RUN dotnet publish CFTSTAPI02.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTAPI02/out ./
ENTRYPOINT ["dotnet", "CFTSTAPI02.dll"]
