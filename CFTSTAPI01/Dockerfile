#------------------------------------------------------------------------------------------------------------
# .net 
#------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTAPI01/*.csproj					       ./CFTSTAPI01/        
COPY CFTSTREGRAS01/*.csproj      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/*.csproj  				   ./CFTSTDADOS01/  

RUN dotnet restore

# copy everything else and build app
COPY CFTSTAPI01/.					       ./CFTSTAPI01/        
COPY CFTSTREGRAS01/.      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/.  				   ./CFTSTDADOS01/  

WORKDIR /app/CFTSTAPI01
RUN dotnet publish CFTSTAPI01.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTAPI01/out ./
ENTRYPOINT ["dotnet", "CFTSTAPI01.dll"]
