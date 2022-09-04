#------------------------------------------------------------------------------------------------------------
# .net 
#------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTAPI/*.csproj					       ./CFTSTAPI/        
COPY CFTSTREGRAS01/*.csproj      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/*.csproj  				   ./CFTSTDADOS01/  

RUN dotnet restore

# copy everything else and build app
COPY CFTSTAPI/.					       ./CFTSTAPI/        
COPY CFTSTREGRAS01/.      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/.  				   ./CFTSTDADOS01/  

WORKDIR /app/CFTSTAPI
RUN dotnet publish CFTSTAPI01.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTAPI/out ./
ENTRYPOINT ["dotnet", "CFTSTAPI.dll"]
